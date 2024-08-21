


import {BrowserRouter, Route, Routes } from "react-router-dom"

import Navbar from "./globals/components/navbar/Navbar"
import Footer from "./globals/components/footer/Footer"
import { Provider } from "react-redux"
import store from "./store/store"
import Home from "./pages/home/Home"
import Cart from "./pages/cart/Cart"
import Login from "./pages/auth/login/Login"
import RegisterForm from "./pages/auth/register/RegisterForm"
import ProductDetails from "./pages/productDetails/ProductDetails"
import Checkout from "./pages/checkout/Checkout"

import KhaltiSuccess from "./pages/success/KhaltiSuccess"
import UserProfile from "./pages/profile/UserProfile"
import MyOrders from "./pages/myorders/MyOrders"
import OrderDetails from "./pages/orderdetails/OrderDetails"
import MyOrderOr from "./pages/myorderqrs/MyOrderOr"
import ForgotPassword from "./pages/auth/forgotPassword/ForgotPassword"
import VerifyOtp from "./pages/auth/verifyOtp/VerifyOtp"
import ResetPassword from "./pages/auth/resetPassword/ResetPassword"

import {io} from 'socket.io-client'
export const socket = io("http://localhost:3000",{
  auth : {
    token : localStorage.getItem("token")
  }
})
function App() {


  return (
    <>
    <Provider store = {store}>
    {/* <Navbar/>
      <RouterProvider router = {router}/>
    <Footer />  */}
    <BrowserRouter>
<Navbar />
    <Routes>
      <Route path = "/" element = {<Home/>} />
      <Route path = "/login" element = {<Login/>}/>
      <Route path = "/register" element = {<RegisterForm/>}/>
      <Route path = "/cart" element = {<Cart/>} />
      <Route path = "/productdetails/:id" element = {<ProductDetails/>} />
      <Route path = "/checkout" element = {<Checkout/>}/>
      <Route path = "/success" element = {<KhaltiSuccess />}/>
      <Route path = "/profile" element = {<UserProfile />}/>
      <Route path = "/myorders" element = {<MyOrders />}/>
      <Route path="/myqrs" element = {<MyOrderOr />}/>
      <Route path= "/myorders/:id" element = {<OrderDetails />} /> 
      <Route path="/forgotpassword" element = {<ForgotPassword />}/>
      <Route path="/verifyotp" element = {<VerifyOtp />}/>
      <Route path="/resetpassword" element = {<ResetPassword />}/>
    </Routes>
    </BrowserRouter>

    </Provider>
    </>
  )
}

export default App
