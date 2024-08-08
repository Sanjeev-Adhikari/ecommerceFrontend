import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const STATUSES = Object.freeze({
    SUCCESS : "success",
    ERROR : "error",
    LOADING : "loading"
})

const productSlice = createSlice({
    name : "product",
    initialState : {
        data : [],
        status : STATUSES.SUCCESS
    },
    reducers : {
        setProducts(state,action){
            state.data = action.payload
        },
        setStatus(state,action){
            state.status = action.payload
        }
    },
    // provided by redux-toolkit
    // extraReducers : (builder) =>{
    //     builder
    //     .addCase(fetchProducts.pending,(state,action)=>{
    //         state.status =STATUSES.LOADING
    //     })
    //     .addCase(fetchProducts.fulfilled,(state,action)=>{
    //         state.status = STATUSES.SUCCESS
    //     })
    //     .addCase(fetchProducts.rejected,(state,action)=>{
    //         state.status = STATUSES.ERROR
    //     })
    // }
});
export const {setProducts, setStatus} = productSlice.actions
export default productSlice.reducer

// export const fetchProducts = createAsyncThunk("product/fetch" ,async()=>{
//     const response = await axios.get("http://localhost:3000/api/products")
//     const data = response.data.data
//      return data
// }) //createAsyncThunk is the name of the middleware provided bu redux-toolkit

//This is a manually made middleware it is provided by redux-toolkit. We can use this in a small project but, when we will have more status top handle som problem may occur so use the createAsyncThunk middleware provided by redux-toolkit
export function fetchProducts(){
    return async function fetchProductThunk(dispatch, getState){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await axios.get("http://localhost:3000/api/products")
            dispatch(setProducts(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        }catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
   
        } 

    }

}
