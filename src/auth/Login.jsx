import { Link } from "react-router";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash, FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../Redux/authSlice";
import { toggleTheme } from "../Redux/ThemeSlice";
import app from "../firebase/firebase";
import Swal from "sweetalert2";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

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

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const showWelcomeAlert = (userName) => {
    return Swal.fire({
      title: `Welcome Back ${userName}!`,
      text: "You have successfully logged in.",
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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setApiError("");
      setIsLoading(true);

      try {
        const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;
        
        dispatch(loginSuccess({
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          },
          token: await user.getIdToken()
        }));
        
        // Show alert and wait for it to complete before redirect
        await showWelcomeAlert(user.displayName || user.email.split('@')[0]);


        // Redirect after alert is dismissed
        window.location.href = "/";
      } catch (error) {
        console.log(error.message);
        
        switch (error.code) {
          case 'auth/user-not-found':
            setApiError("No account found with this email. Please sign up first.");
            break;
          case 'auth/wrong-password':
            setApiError("Incorrect password. Please try again.");
            break;
          case 'auth/invalid-email':
            setApiError("Invalid email format. Please check your email.");
            break;
          case 'auth/too-many-requests':
            setApiError("Too many failed attempts. Please try again later.");
            break;
          default:
            setApiError(error.message || "An error occurred during sign in. Please try again.");
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
      
      dispatch(loginSuccess({
        user: {
          uid: user.uid,
          name: user.displayName || user.email.split('@')[0],
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        },
        token: await user.getIdToken()
      }));

      // Show alert for Google sign in
      await showWelcomeAlert(user.displayName || user.email.split('@')[0]);
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
        default:
          setApiError("Google sign-in failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 px-4 py-8 transition-colors duration-300">
      
      <button
        onClick={() => dispatch(toggleTheme())}
        className="fixed top-5 right-5 z-50 p-2 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-slate-700"
      >
        {isDarkMode ? <FaSun className="w-5 h-5 text-yellow-500" /> : <FaMoon className="w-5 h-5 text-slate-700" />}
      </button>

      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-800">
          <div className="h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          
          <div className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg mb-3">
                <span className="text-3xl font-black text-white">★</span>
              </div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Nove
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Welcome back</p>
            </div>

            {apiError && (
              <div className="mb-5 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-red-600 dark:text-red-400 text-sm text-center">{apiError}</p>
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none
                    ${formik.errors.email && formik.touched.email ? "border-red-500" : "border-gray-300 dark:border-slate-700"}
                    bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white
                    focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
                    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">{formik.errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Password</label>
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
                      ${formik.errors.password && formik.touched.password ? "border-red-500" : "border-gray-300 dark:border-slate-700"}
                      bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white
                      focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
                      ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">{formik.errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={!formik.isValid || !formik.dirty || isLoading}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 mt-6
                  ${formik.isValid && formik.dirty && !isLoading
                    ? "bg-linear-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white shadow-lg"
                    : "bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"}
                  `}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="flex items-center justify-center gap-3 w-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
            >
              <FcGoogle size={22} />
              <span>Continue with Google</span>
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;