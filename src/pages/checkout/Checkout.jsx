import { useDispatch, useSelector } from "react-redux"
import { deleteCartItem } from "../../store/cartSlice"
import {useForm} from 'react-hook-form'
import { useEffect, useState } from "react"
import { createOrder } from "../../store/checkOutSlice"
import {useNavigate} from "react-router-dom"
import { STATUSES } from "../../globals/misc/statuses";
import { APIAuthenticated } from "../../http"

const Checkout = () => {

   const dispatch = useDispatch()
   const navigate = useNavigate()
   const {items:products} = useSelector((state)=>state.cart)
   const {register, handleSubmit, formState } = useForm()
   const {status, data} = useSelector((state)=>state.checkout)
   const [paymentMethod,setPaymentMethod] = useState("CashOnDelivery")
   const subTotal = products.reduce((amount,item)=>item.quantity*item.product.productPrice + amount,0)
   const shippingAmount = 100
   const totalAmount = subTotal + shippingAmount
  
   const handleOrder = (data)=>{
    const orderDetails = {
      shippingAddress : data.ShippingAddress,
      totalAmount : totalAmount,
      items : products,
      paymentDetails : {
          method : paymentMethod
      },
      phoneNumber : data.phoneNumber
    }
    dispatch(createOrder(orderDetails))
   }
  const proceedForKhaltiPayment = ()=>{
    const currentOrder = data[data.length -1]
    //check if the method is CashOnDelivery
    if(paymentMethod === 'CashOnDelivery' && status === STATUSES.SUCCESS && data.length >0)
    {
    alert("Order Placed Successfully")
       // Redirect to the home page
    window.location.href = "/";
    return;
    }
     
  
    //check if the method selected is khalti
    if(paymentMethod === 'khalti' && status === STATUSES.SUCCESS && data.length >0){
      const {totalAmount,_id:orderId} = data[data.length -1]
  
        //redirect to khalti payment page
        //totalAmount, orderId
        // navigate(`/khalti?orderid=${_id}&totalamount=${totalAmount}`)
      handleKhalti(orderId,totalAmount)    
      }
   }

   useEffect(()=>{
    proceedForKhaltiPayment()

   },[status,data])
   const handlePaymentChange = (e)=>{
    setPaymentMethod(e.target.value)
   }
   const handleDelete = (productId)=>{
        dispatch(deleteCartItem(productId))
    }
   const handleKhalti = async (orderId,totalAmount)=>{
      try {
        const response = await APIAuthenticated.post("/payment",{orderId,amount:totalAmount})
        if(response.status == 200){
          window.location.href = response.data.paymentUrl

        }
       
      } catch (error) {
        console.log(error)
      }
    }

    const handleCod = async ()=>{
      if(response.status == 200){
        window.location.href = "/"

      }
    }
return (
   <>

<div  className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
 
  <div className="mt-4 py-5 text-xs sm:mt-0 sm:ml-auto sm:text-base">
   
  </div>
</div>
<div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
  <div className="px-4 pt-8">
    <p className="text-xl font-medium">Order Summary</p>
    <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
    
    {products.length > 0 && products.map((product)=>{

        return (


            <div key={product.product._id} className="flex flex-col rounded-lg bg-white sm:flex-row">
            <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
            <div className="flex w-full flex-col px-4 py-4">
              <span className="font-semibold">{product.product.productName}</span>
              <span className="font-semibold">Qty: {product.quantity}</span>
              <span className="float-right text-gray-400">{product.product.productDescription}</span>
              <p className="text-lg font-bold">Rs {product.product.productPrice}</p>
              {/* <button  onClick={() => handleDelete(product.product._id)} className="bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 rounded-lg px-3 py-1">Remove</button> */}

              <button 
  onClick={() => handleDelete(product.product._id)} 
  className="bg-red-500 mt-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 rounded-md text-sm px-4 py-2 w-20 flex items-center justify-center"
>
  Remove
</button>               
            </div>
          </div>
        )
    })}    
    </div>
    <p className="mt-8 text-lg font-medium">Payment Methods</p>
    <form className="mt-5 grid gap-6">
      <div className="relative">
        <input className="peer hidden" id="radio_1" type="radio" name="radio" value= "CashOnDelivery" checked={paymentMethod== 'CashOnDelivery'} onChange={handlePaymentChange} />
        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
          <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
          <div className="ml-5">
            <span className="mt-2 font-semibold">Cash On Delivery</span>      
          </div>
        </label>
      </div>
      <div className="relative">
        <input className="peer hidden" id="radio_2" type="radio" name="radio" value="khalti" onChange={handlePaymentChange}/>
        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
          <img className="w-14 object-contain" src="/images/oG8xsl3xsOkwkMsrLGKM4.png" alt="" />
          <div className="ml-5">
            <span className="mt-2 font-semibold">Khalti Pay</span> 
          </div>
        </label>
      </div>
    </form>
  </div>
 <form onSubmit={handleSubmit((data)=>{
    handleOrder(data)
 })} noValidate>
 <div className="mt-12 rounded-lg bg-gray-50 px-4 pt-8 lg:mt-0">
  <p className="text-xl  font-large">Payment Details</p>
  <p className="text-gray-400">Complete your order by providing your payment details.</p>
  
 
  <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
  <input 
    type="text" 
    id="email" 
    name="email" 
    className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" 
    placeholder="Email" {...register('email', {required : "Email is required"})}
  />
  <p>{formState.errors.email && (<span style={{color : 'red'}}>{formState.errors.email.message}</span>)}</p>

   <label htmlFor="phone-number" className="block  mt-8 text-sm font-medium mb-2">Phone Number</label>
  <input
    type="tel"
    id="phone-number"
    name="phone-number"
    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-4"
    placeholder="Enter your phone number"
    pattern="[0-9]{10}" {...register('phoneNumber', {required : "Phone number is required"})}
  />
  <p>{formState.errors.phoneNumber && (<span style={{color: 'red'}}>{formState.errors.phoneNumber.message}</span>)}</p>
  
 
  

  <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
  <div className="relative">
    <input 
      type="text" 
      id="billing-address" 
      name="billing-address" 
      className="w-full rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" 
      placeholder="Street Address" {...register('ShippingAddress', {required : "Shipping address is required"})}
    />
    <p>{formState.errors.ShippingAddress && (
          <span style={{ color: 'red' }}>
            {formState.errors.ShippingAddress.message}
          </span>) }</p>
  </div>

  
  <div className="mt-6 border-t border-b py-2">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-900">Subtotal</p>
      <p className="font-semibold text-gray-900">Rs: {subTotal}</p>
    </div>
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-900">Shipping</p>
      <p className="font-semibold text-gray-900">Rs: {shippingAmount}</p>
    </div>
  </div>
  <div className="mt-6 flex items-center justify-between">
    <p className="text-sm font-medium text-gray-900">Total</p>
    <p className="text-2xl font-semibold text-gray-900">Rs: {totalAmount}</p>
  </div>


  {
    paymentMethod === 'CashOnDelivery'? (
      <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white" >Cash On Delivery</button>
    ) :
    <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white" style={{backgroundColor:"purple"}} onChange={handleKhalti}>Pay With Khalti</button>
  }

</div>
 </form>

</div>

   </>
  )
}

export default Checkout