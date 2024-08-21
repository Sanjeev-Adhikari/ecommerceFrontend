import { createSlice } from "@reduxjs/toolkit";

import { STATUSES } from "../globals/misc/statuses";
import {API, APIAuthenticated} from "../http";



const authSlice = createSlice({
    name : "auth",
    initialState : {
        data : [],
        status : STATUSES.SUCCESS,
        token : "",
       forgotPasswordData : {
        email : null,
        status : STATUSES.LOADING
       }

    },
    reducers : {
        setUser(state,action){
            state.data = action.payload
        },
        setStatus(state,action){
            state.status = action.payload
        },
        setToken(state,action){
            state.token = action.payload
        },
        logOut(state,action){
            state.data = []
            state.token = null
            state.state = STATUSES.SUCCESS
        },
        setEmail(state,action){
            state.forgotPasswordData.email = action.payload
        },
        setForgotPasswordStatus(state,action){
            state.forgotPasswordData.status = action.payload
        }
    },
    
});
export const {setUser, setStatus, setToken, logOut, setEmail, setForgotPasswordStatus} = authSlice.actions
export default authSlice.reducer


export function registerUser(data){
    return async function registerUserThunk(dispatch){
       dispatch(setStatus(STATUSES.LOADING))
        try{
        const response = await API.post("auth/register",data)
        //  dispatch(setUser(response.data.data))
         dispatch(setStatus(STATUSES.SUCCESS))
        }catch (error){
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
    
}

export function loginUser(data){
    return async function loginUserThunk(dispatch){
       dispatch(setStatus(STATUSES.LOADING))
        try{
        const response = await API.post("auth/login",data)
        dispatch(setUser(response.data.data))
         dispatch(setToken(response.data.token))
         dispatch(setStatus(STATUSES.SUCCESS))
         localStorage.setItem('token', response.data.token)
        }catch (error){
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
    
}

export function fetchProfile(){
    return async function fetchProfileThunk(dispatch){
       dispatch(setStatus(STATUSES.LOADING))
        try{
        const response = await APIAuthenticated.get("profile/")
         dispatch(setUser(response.data.data))
         dispatch(setStatus(STATUSES.SUCCESS))
        }catch (error){
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
    
}

export function forgotPassword(data){
    return async function forgotPasswordThunk(dispatch){
       dispatch(setStatus(STATUSES.LOADING))
        try{
        const response = await APIAuthenticated.post("auth/forgotpassword/", data)
         dispatch(setEmail(response.data.data))
         dispatch(setStatus(STATUSES.SUCCESS))
        }catch (error){
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
    
}

export function verifyOtp(data){
    return async function verifyOtpThunk(dispatch){
       dispatch(setStatus(STATUSES.LOADING))
        try{
        const response = await APIAuthenticated.post("auth/verifyotp/", data)
            dispatch(setEmail(data.email))
         dispatch(setForgotPasswordStatus(STATUSES.SUCCESS))
        }catch (error){
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
    
}











