import { createSlice } from "@reduxjs/toolkit";

import { STATUSES } from "../globals/misc/statuses";
import {APIAuthenticated} from "../http";



const checkOutSlice = createSlice({
    name : "checkout",
    initialState : {
        data : [],
        status : STATUSES.SUCCESS,  
        orders : null
    },
    reducers : {
        setOrder(state,action){
            state.data.push(action.payload)
        },
        setStatus(state,action){
            state.status = action.payload
        },
        setOrders(state,action){
            state.orders = action.payload
        },
        updateOrderStatus(state,action){
            const status = action.payload.status
            const orderId = action.payload.orderId

            const updatedOrder = state.orders.map((order)=>
                order._id === orderId ? {...order,orderStatus : status} : order
        
            )
            state.orders = updatedOrder
        }
    },
    
});
export const {setOrder, setStatus, setOrders, updateOrderStatus} = checkOutSlice.actions
export default checkOutSlice.reducer


export function createOrder(data){
    return async function createOrderThunk(dispatch){
       dispatch(setStatus(STATUSES.LOADING))
        try{
        const response = await APIAuthenticated.post("orders/",data)
         dispatch(setOrder(response.data.data))
         dispatch(setStatus(STATUSES.SUCCESS))
        }catch (error){
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
    
}

export function fetchOrder(data){
    return async function fetchOrderThunk(dispatch){
       dispatch(setStatus(STATUSES.LOADING))
        try{
        const response = await APIAuthenticated.get("orders/",data)
        console.log(response.data.data)
         dispatch(setOrders(response.data.data))
         dispatch(setStatus(STATUSES.SUCCESS))
        }catch (error){
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
    
}

export function updateOrderStatusInStore(data){
    return async function updateOrderStatusInStoreThunk(dispatch){
        dispatch(updateOrderStatus(data))
    }
}










