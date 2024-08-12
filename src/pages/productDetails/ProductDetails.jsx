import React from 'react'

import Review from './components/review/Review'
import Navbar from '../../globals/components/navbar/Navbar'
import Product from './components/product/Product'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
      const {id} = useParams()
     
  return (
    <>
    <Navbar/>
    <Product id={id}/>
    <Review/>
    </>
  )
}

export default ProductDetails