


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
    </Routes>
    </BrowserRouter>

    </Provider>
    </>
  )
}

export default App
