import { configureStore } from "@reduxjs/toolkit";

import cartReducer from './cartSlice'

import authSlice from './authSlice'

import productReducer from "./productSlice"
const store = configureStore({
    reducer : {
        cart : cartReducer,
        product : productReducer,
        auth : authSlice
    }
})

export default store