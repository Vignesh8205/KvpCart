import React, { useEffect, useState } from 'react'
import MetaData from './layout/MetaData'
import axios from 'axios'
import Card from './card/card'
import { Pagination } from '@mui/material'
import Loader from './loader/loader'

export default function Home() {
  // page nation
const [page,setpage]=useState(1)
// loding
const [loading,setloading]=useState(false)

// total page conut
const [pagecount,setcount]=useState(1)
 
// products
  const [products,setproducts]=useState([])
  // 
  const handleChange = (event, value) => {
    setpage(value);
    test()
   };
  
  //  api data fetching
   const test= async ()=>{
    await axios.get(`http://localhost:8000/api/v1/products?page=${page}`).then(res=>{
      
      setcount(res.data.count)
      setloading(res.data.success);
      setproducts(res.data.products)
    })
   }
  useEffect(()=>{
    test()
  },[page])

  

  return (
    <>
    {loading?
    <div>
    <MetaData title={'Buy best products'}/> 
        <h1 >Latest product</h1>
        <div className='cards'>{
          products.map(res=>{
            return (
              <>
              <Card col={3} name={res.name} price={res.price} seller={res.seller} rating={Number(res.ratings)} reviews={res.numOfReviews} image={res.images[0].image} id={res._id} />
              </>
            )
          })
          }

        </div>
        <br />
       <div className='pagenation'>

       <Pagination count={3} variant="outlined" shape="rounded" sx={{backgroundColor:'white'}} onChange={handleChange} />
       </div>
    </div>:<Loader/>}
    </>
  )
}
