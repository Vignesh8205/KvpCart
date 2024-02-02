import React, { useEffect, useState } from 'react'
import MetaData from './layout/MetaData'
import axios from 'axios'
import Card from './card/card'
import { Pagination } from '@mui/material'
import Loader from './loader/loader'
import { useParams } from 'react-router-dom'

import Slider from '@mui/material/Slider';



function valuetext(value) {
 
  return `${value} ₹`;
}

export default function Productsearch() {
  // price
  const [price, setprice] = React.useState([1, 1000]);

  const handleslider = (event, newValue) => {
    setprice(newValue);
    test1()
  };

  // category 
  // const [category, setcategory] = React.useState(null);

  const categories = [  
    'Electronics',
    'Mobile Phones',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home'
];

 const categoryfilter= async (e)=>{

  if (e) {
    
    await axios.get(`http://localhost:8000/api/v1/products?page=${page}&category=${e}`).then(res=>{
        //   setcount(res.data.resPerPage)
          setloading(res.data.success);
          setproducts(res.data.products)
        }) 
       }   
    
     }
 
    //  rating filter
    const [rating,setrating]=useState(0)
    const ratings= async ()=>{

      if (rating) {
        await axios.get(`http://localhost:8000/api/v1/products?page=${page}&ratings=${rating}`).then(res=>{
            //   setcount(res.data.resPerPage)
              setloading(res.data.success);
              setproducts(res.data.products)
            }) 
           }   
         }

    // search key word
const {keyword} = useParams()
  // page nation
const [page,setpage]=useState(1)
// lodingroduct 
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
   const  test = async ()=>{
    if (keyword) {
        await axios.get(`http://localhost:8000/api/v1/products?page=${page}&keyword=${keyword}`).then(res=>{
            //   setcount(res.data.resPerPage)
              setloading(res.data.success);
              setproducts(res.data.products)
            }) 
    }
   
   }
  //  price
   const test1 =async ()=>{
    if (price) {
      await axios.get(`http://localhost:8000/api/v1/products?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}`).then(res=>{
          //   setcount(res.data.resPerPage)
            setloading(res.data.success);
            setproducts(res.data.products)
          }) 
  }
   }
  useEffect(()=>{
    test()
    
  },[keyword])


  return (
    <>

<div>

    <div>
    <MetaData title={'Buy best products'}/> 
    <h1 id="products_heading">Search Products</h1>
        <section className="container mt-5" id="products">
          <div className='row'>

                    <div className="col-6 col-md-3 mb-5 mt-5" >
                                {/* Price Filter */}
                                <div className="px-5" >
                               <Slider
                                getAriaLabel={() => valuetext}
                                value={price}
                                onChange={handleslider}
                                valueLabelDisplay="auto"
                               
                                max={1000}
                                min={1}
                             />
                           
                                </div>
                                <hr className="my-5" />        
                                {/* Category Filter */}
                                <div className="mt-5">
                                     <h3 className="mb-3">Categories</h3> 
                                       <ul className="pl-0">
                                        {categories.map(category =>
                                             <li key={category} onClick={()=>{categoryfilter(category)}}>
                                                 {category}
                                             </li>
                                            
                                            )}
                                           
                                       </ul>
                                </div>
                                <hr className="my-5" /> 
                                {/* Ratings Filter */}
                                <div className="mt-5">
                                    <h4 className="mb-3">Ratings</h4>
                                    <ul className="pl-0">
                                       {
                                        [5,4,3,2,1].map(star=>{
                                          return(
                                            <>
                                             <li style={{cursor:'pointer',
                                                       listStyleType:'none'}}
                                                       key={star} onClick={()=>{setrating(star) 
                                                       ratings()}} >
                                               * {star}
                                             </li>
                                            </>
                                          )
                                        })
                                       }
                                            
                                          
                                           
                                       </ul>
                                </div>
                    </div>

            {loading?<div className='col-6 col-md-9 d-flex'>{
              products.map(res=>{
               return (
                  <>
                  <div>

                  <Card col={4} name={res.name} price={res.price} seller={res.seller} rating={Number(res.ratings)} reviews={res.numOfReviews} image={res.images[0].image} id={res._id} />
                  </div>
                  </>
                 )
               })
             } </div>:<Loader/>}
          </div>

        </section>

        <br />
       <div className='pagenation'>

       <Pagination count={pagecount} variant="outlined" shape="rounded" sx={{backgroundColor:'white'}} onChange={handleChange} />
       </div>
    </div>
   
</div>
     
    </>
  )
}
