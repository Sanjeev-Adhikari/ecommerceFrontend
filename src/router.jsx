import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import LoginForm from "./globals/components/forms/LoginForm";
import RegistrationForm from "./globals/components/forms/RegistrationForm";
import Cart from "./pages/cart/Cart";

const router = createBrowserRouter([
  {
    path : "/",
    element : <Home />
  },
   {
    path : "/login",
    element : <LoginForm />
   },
   {
    path : "/registration",
    element : <RegistrationForm />
   },
  
   {
    path : "/cart",
    element : <Cart />
   }

])

export default router