import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/misc/statuses";
import {API} from "../http";

const productSlice = createSlice({
    name : "product",
    initialState : {
        data : [],
        status : STATUSES.SUCCESS,
        selectedProduct : {}
    },
    reducers : {
        setProducts(state,action){
            state.data = action.payload
        },
        setStatus(state,action){
            state.status = action.payload
        },
        setselectedProduct(state,action){
            state.selectedProduct = action.payload
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
export const {setProducts, setStatus, setselectedProduct} = productSlice.actions
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
            const response = await API.get("/products")
            dispatch(setProducts(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        }catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
   
        } 

    }

}


export function fetchProductDetails(productId){
    return async function fetchProductDetailsThunk(dispatch, getState){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.get(`/products/${productId}`)
            dispatch(setselectedProduct(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        }catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
   
        } 

    }

}
