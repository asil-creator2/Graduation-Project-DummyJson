import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route,
  RouterProvider ,
  Outlet
} from "react-router"
import Home from "./pages/Home"
import Login from "./auth/Login"
import Cart from "./pages/Cart"
import SignUp from "./auth/SignUp"
import ProductDetails from "./pages/Product"
import About from "./pages/About"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { useEffect } from "react"
import { setCart } from "./Redux/cartSlice"
import { fetchCart } from "./services/cartService"
import { useDispatch, useSelector } from "react-redux"
import Shop from "./pages/Shop"


const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
const App = () => {
  const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user);
  // تحميل السلة من Firestore أول ما الصفحة تفتح
  useEffect(() => {
      const loadCart = async () => {
          if (user?.uid) {
              const cartProducts = await fetchCart(user.uid);
              dispatch(setCart(cartProducts));
          }
      };
      
      loadCart();
  }, [user?.uid, dispatch]);
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/about" element = {<About/>} />
        <Route path = "/shop" element={<Shop/>} />
        {/* Dynamic route with product ID parameter */}
        <Route path="/product/:id" element={<ProductDetails/>} />
      </Route>

      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
    </Route>
  ))

  return (
    <div className="dark:bg-gray-900">
          <RouterProvider router={router} />
    </div>
  )
}

export default App