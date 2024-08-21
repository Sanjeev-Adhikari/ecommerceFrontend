import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { APIAuthenticated } from '../../http'
import QRCode from 'react-qr-code'

const OrderDetails = () => {
const navigate = useNavigate()
const {id} = useParams()
const {orders} = useSelector((state)=>state.checkout)


const [filteredOrder] = orders.filter((order)=>order._id === id)

const adminorderPageurl = `http://localhost:3001/admin/orders/${id}`


const cancelOrder =async()=>{
    
    try {
        const response = await APIAuthenticated.patch("/orders/cancel", {id})
      if(response.status == 200){
        navigate("/myorders")
      }
        
    } catch (error) {
        console.log(error)
    }

}

const deleteOrder = async()=>{

 try {
  const response = await APIAuthenticated.delete(`/orders/${id}`)
  if(response.status == 200){
    alert('Order deleted successfully')
    navigate('/myorders')
    

  }
 } catch (error) {
  console.log(error)
 }
}

  return (
   <>

<div className='pl-9 pt-10'>
    
    
    <div className="py-14 px-8 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
  <div className="flex justify-start item-start space-y-2 flex-col">
    <h1 className="text-1xl  dark:text-white lg:text-2xl font-semibold  text-gray-800">Order: {id}</h1>
    <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">21st Mart 2021 at 10:34 PM</p>
  </div>
  <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
      <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
        <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">My Order</p>
        <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
         
        </div>
       {
        filteredOrder && filteredOrder.items.length > 0 && filteredOrder.items.map((item)=>{

            return (

                <div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full">
                <div className="w-full md:w-40">
                  <img className="w-full hidden md:block" src="https://i.ibb.co/s6snNx0/Rectangle-17.png" alt="dress" />
                  <img className="w-full md:hidden" src="https://i.ibb.co/BwYWJbJ/Rectangle-10.png" alt="dress" />
                </div>
                <div className="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{item.product.productName}</h3>
                   
                  </div>
                  <div className="flex justify-between space-x-8 items-start w-full">
                    <p className="text-base dark:text-white xl:text-lg leading-6">Rs: {item.product.productPrice} </p>
                    <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">Qty: {item.quantity}</p>
                    <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">Rs: {item.product.productPrice * item.quantity}</p>
                  </div>
                </div>
              </div>
            )
        })
       }
      </div>
      <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
          <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
            
            <div className="flex justify-between items-center w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">Payment Method</p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{filteredOrder?. paymentDetails.method}</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">Payment Status</p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{filteredOrder?. paymentDetails.status}</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">Order Status</p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{filteredOrder?.orderStatus}</p>
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
            <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{filteredOrder?.totalAmount}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Home delivery</h3>
          <div className="flex justify-between items-start w-full">
            <div className="flex justify-center items-center space-x-4">
              <div className="w-8 h-8">
                <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
              </div>
              <div className="flex flex-col justify-start items-center">
                <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">Delivery charge<br /><span className="font-normal">Delivery with 24 Hours</span></p>
              </div>
            </div>
            <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">Rs: 100</p>
          </div>
          <div className="w-full flex justify-center items-center">

          </div>
        </div>
      </div>
    </div>
  <div className='flex flex-col'>
  <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col" style={{height :'250px'}}>
      <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
      <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
       
      
        <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
          <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
              <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Address: {filteredOrder?.shippingAddress}</p>
              <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">Phone: {filteredOrder?.phoneNumber}</p>
            </div>
           
          </div>
          <div className="flex w-45 mt-5 justify-center items-center md:justify-start md:items-start">
          {
            filteredOrder?.orderStatus !== 'cancelled' && (
              <>
            <button className="mt-4 md:mt-0 l dark:border-white w-15 dark:text-white py-4 rounded-full
           hover:bg-green-500 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full 
           text-base font-medium leading-4 text-gray-800 bg-green-300 hover:bg-green-400">
           Edit Order
            </button>

            <button className="mt-4 md:mt-0 dark:border-white w-15 ml-4  dark:text-white py-4 rounded-full
             bg-yellow-300 hover:bg-yellow-400  focus:ring-gray-800 border
           border-gray-800 font-medium w-96 2xl:w-full  leading-4 text-gray-800" onClick={cancelOrder}>Cancel Order</button>
              </>
          )
          }       
          </div>
      
        {
          filteredOrder?.orderStatus !== 'cancelled' && (
            <div className="flex w-45 mt-5 justify-center items-center md:justify-start md:items-start">
            <button className="mt-4 md:mt-0 dark:border-white w-15    dark:text-white py-4 rounded-full
             bg-red-300 hover:bg-red-400  focus:ring-gray-800 border border-gray-800 
              w-96 2xl:w-full font-medium leading-4 text-gray-800" onClick={deleteOrder}>Delete Order</button>

              
           
            </div>
            
          )
        }
         
        </div>
      
      </div>
    </div>
    <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex mt-10 justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col" style={{height :'250px'}}>
      <h3 className="text-xl dark:text-white font-semibold leading-5 mx-auto mb-5 text-gray-800"> Or Code</h3>
      
      <QRCode value={adminorderPageurl} />
    </div>
  
  </div>
 
 
  </div>
  

</div>

     </div>
   
   </>
  )
}

export default OrderDetails