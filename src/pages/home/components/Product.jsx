
import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import { add } from '../../../store/cartSlice'
import { fetchProducts } from '../../../store/productSlice'
import { useSelector } from 'react-redux'

export default function Product() {

 const dispatch = useDispatch()
 const {data : products,status} = useSelector((state)=>state.product)
//used redux toolkit for state management and now it doesnot need to done like this
 //  const fetchProducts = async ()=>{

 useEffect(()=>{
  //fetchProducts()
  dispatch(fetchProducts())//This is the new way here data is comming from productReducer that we made in our store
 },[])

 const addToCart = (product)=>{
    dispatch(add(product))
 }



  return (
    <>
   
  
   <div className="w-screen mt-20 flex flex-row justify-center flex-wrap " >
{
  products.map((product)=>{
    return (
      
<div className="container mx-auto max-w-sm w-full p-4 sm:w-1/2 ">
      <div key = {product._id} className="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl">
      <div className="prod-title">
        <p className="text-2xl uppercase text-gray-900 font-bold">{product.productName}</p>
        <p className="uppercase text-sm text-gray-400">
          {product.productDescription}
        </p>
      </div>
      <div className="prod-img">
        <img src={product.productImage}
             className="w-full object-cover object-center" />
      </div>
      <div className="prod-info grid gap-10">
       
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-900">
          <p className="font-bold text-xl">{product.productPrice}</p>
          <button
                 onClick = {()=>addToCart(product)} className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-yellow-500 hover:text-white border-2 border-gray-900 focus:outline-none">Add
            to cart</button>
        </div>
      </div>
    </div>
    </div>
    



    )
  })
}
</div>

 

    </>
  )
}

