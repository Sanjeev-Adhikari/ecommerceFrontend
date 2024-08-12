import React, { useEffect, useState } from 'react'
import { APIAuthenticated } from '../../http'
import Loader from '../../globals/components/loader/Loader'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { emptyCart } from '../../store/cartSlice'

const KhaltiSuccess = () => {
const navigate = useNavigate()
const dispatch =useDispatch()
const queryParams = new URLSearchParams(location.search)
const pidx = queryParams.get("pidx")
const [loading,setLoading] =useState(true)

const verifyPidx = async()=>{
   try {
    const response = await APIAuthenticated.post("/payment/verifypidx", {pidx})
    if(response.status === 200){
      setLoading(false)
      dispatch(emptyCart())
       
    }
   } catch (error) {
    console.log(error)
   }
}

useEffect(()=>{
  verifyPidx()
},[])

if(loading){
  return(
    <>
    <Loader status='verifying'/>
    </>
  )
}else {

  return <Loader status = 'verified'/>

}

 
}

export default KhaltiSuccess