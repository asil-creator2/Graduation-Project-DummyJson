import { Link } from "react-router";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash, FaMoon, FaStar, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../Redux/authSlice";
import { toggleTheme } from "../Redux/ThemeSlice";
import app from "../firebase/firebase";
import Swal from "sweetalert2";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const SignUp = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const themeState = theme?.state || 'light';
  const isDarkMode = themeState === 'dark';

  // Apply theme class to html element
  useEffect(() => {
    if (themeState === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeState]);

  const showWelcomeAlert = (userName) => {
    return Swal.fire({
      title: `Welcome ${userName}!`,
      text: "Your account has been created successfully.",
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'Start Shopping',
      confirmButtonColor: '#3b82f6',
      showCancelButton: false,
      allowOutsideClick: false,
      allowEscapeKey: true,
      timer: 3000,
      timerProgressBar: true,
      background: isDarkMode ? '#1e293b' : '#ffffff',
      color: isDarkMode ? '#f1f5f9' : '#1e293b',
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'px-5 py-2 rounded-lg font-medium',
      }
    });
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 50 characters")
      .required("Name is required")
      .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/, "Please enter a valid email"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),

    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setApiError("");
      setIsLoading(true);

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        const user = userCredential.user;

        await updateProfile(user, {
          displayName: values.name,
        });

        // Save user data to Redux
        dispatch(loginSuccess({
          user: {
            displayName: values.name,
            email: user.email,
            uid: user.uid,
          },
          token: await user.getIdToken()
        }));

        // Show alert and wait for it to complete before redirect
        await showWelcomeAlert(values.name);

        // Redirect after alert is dismissed
        window.location.href = "/";
      } catch (error) {
        console.log(error.message);
        
        switch (error.code) {
          case 'auth/email-already-in-use':
            setApiError("This email is already registered. Please sign in instead.");
            break;
          case 'auth/invalid-email':
            setApiError("Invalid email format. Please check your email.");
            break;
          case 'auth/weak-password':
            setApiError("Password is too weak. Please use a stronger password.");
            break;
          case 'auth/operation-not-allowed':
            setApiError("Email/password accounts are not enabled. Please contact support.");
            break;
          default:
            setApiError(error.message || "An error occurred during sign up. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleGoogleSignIn = async () => {
    setApiError("");
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userName = user.displayName || user.email.split('@')[0];
      
      // Save user data to Redux for Google Sign-In
      dispatch(loginSuccess({
        user: {
          displayName: userName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL || null,
        },
        token: await user.getIdToken()
      }));

      // Show alert for Google sign up
      await showWelcomeAlert(userName);

      
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setApiError("Sign-in popup was closed. Please try again.");
          break;
        case 'auth/popup-blocked':
          setApiError("Pop-up was blocked by your browser. Please allow pop-ups for this site.");
          break;
        case 'auth/network-request-failed':
          setApiError("Network error. Please check your internet connection.");
          break;
        case 'auth/account-exists-with-different-credential':
          setApiError("An account already exists with this email. Please sign in with your email and password.");
          break;
        default:
          setApiError("Google sign-up failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 px-4 py-8 transition-colors duration-300">
      
      {/* Dark Mode Toggle Button */}
      <button
        onClick={() => dispatch(toggleTheme())}
        className="fixed top-5 right-5 z-50 p-2 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-slate-700"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <FaSun className="w-5 h-5 text-yellow-500" />
        ) : (
          <FaMoon className="w-5 h-5 text-slate-700" />
        )}
      </button>

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-800 transition-all duration-300">
          
          {/* Header with accent line */}
          <div className="h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          
          <div className="p-6 sm:p-8">
            {/* Logo */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg mb-3">
                <span className="text-3xl font-black text-white"><FaStar/></span>
              </div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Nove
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                Create your account to start shopping
              </p>
            </div>

            {/* API Error Message */}
            {apiError && (
              <div className="mb-5 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl animate-shake">
                <p className="text-red-600 dark:text-red-400 text-sm text-center">
                  {apiError}
                </p>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={formik.handleSubmit} className="space-y-4">

              {/* NAME */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none
                    ${formik.errors.name && formik.touched.name
                      ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500"}
                    bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white
                    focus:ring-2 focus:ring-indigo-500/20
                    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                    placeholder:text-gray-400 dark:placeholder:text-gray-500`}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1.5 flex items-center gap-1">
                    <span className="text-xs">⚠️</span> {formik.errors.name}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none
                    ${formik.errors.email && formik.touched.email
                      ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500"}
                    bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white
                    focus:ring-2 focus:ring-indigo-500/20
                    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                    placeholder:text-gray-400 dark:placeholder:text-gray-500`}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1.5 flex items-center gap-1">
                    <span className="text-xs">⚠️</span> {formik.errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD with Show/Hide */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isLoading}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none pr-12
                      ${formik.errors.password && formik.touched.password
                        ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                        : "border-gray-300 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500"}
                      bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white
                      focus:ring-2 focus:ring-indigo-500/20
                      ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                      placeholder:text-gray-400 dark:placeholder:text-gray-500`}
                  />
                  
                  {/* Show/Hide Password Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1.5 flex items-center gap-1">
                    <span className="text-xs">⚠️</span> {formik.errors.password}
                  </p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                  Password must contain at least one uppercase, one lowercase, and one number
                </p>
              </div>

              {/* CONFIRM PASSWORD with Show/Hide */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showRePassword ? "text" : "password"}
                    name="rePassword"
                    placeholder="••••••"
                    value={formik.values.rePassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isLoading}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none pr-12
                      ${formik.errors.rePassword && formik.touched.rePassword
                        ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                        : "border-gray-300 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500"}
                      bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white
                      focus:ring-2 focus:ring-indigo-500/20
                      ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                      placeholder:text-gray-400 dark:placeholder:text-gray-500`}
                  />
                  
                  {/* Show/Hide Confirm Password Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowRePassword(!showRePassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                    aria-label={showRePassword ? "Hide password" : "Show password"}
                  >
                    {showRePassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
                {formik.touched.rePassword && formik.errors.rePassword && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1.5 flex items-center gap-1">
                    <span className="text-xs">⚠️</span> {formik.errors.rePassword}
                  </p>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={!formik.isValid || !formik.dirty || isLoading}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 mt-6
                  ${formik.isValid && formik.dirty && !isLoading
                    ? "bg-linear-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    : "bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"}
                  `}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>

            </form>

            {/* DIVIDER */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400">
                  Or sign up with
                </span>
              </div>
            </div>

            {/* GOOGLE BUTTON */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="flex items-center justify-center gap-3 w-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <FcGoogle size={22} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">Continue with Google</span>
            </button>

            {/* SIGN IN LINK */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 transition"
                >
                  Sign In
                </Link>
              </p>
            </div>

            {/* Terms & Privacy */}
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-800">
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SignUp;