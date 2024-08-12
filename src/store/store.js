import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import authSlice from './authSlice'
import productReducer from "./productSlice"
import checkOutSlice from "./checkOutSlice";
const store = configureStore({
    reducer : {
        cart : cartReducer,
        product : productReducer,
        auth : authSlice,
        checkout : checkOutSlice
    }
})

export default store