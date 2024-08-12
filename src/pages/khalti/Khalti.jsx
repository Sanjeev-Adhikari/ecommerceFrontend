import React, { useEffect } from 'react'

const Khalti = () => {


const queryParams = new URLSearchParams(location.search)
const totalAmount = queryParams.get("totalamount")
const orderId = queryParams.get("orderid")

useEffect(()=>{
    //axios.post=> with above data khalti payment initiate garne api hit hanne

},[])
  return (
    <div>Khalti</div>
  )
}

export default Khalti