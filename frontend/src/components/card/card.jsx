import React from 'react'
import BasicRating from './ratting'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Card(props) {
  return (
    <>
     <div className={`col-sm-12 col-md-6 col-lg-${props.col} my-3 `}>
    <div className='pcard '>
        <img src={props.image} alt="product image" width="200px" height="150px" />
        <p className='productname'>{props.name}</p>
        <p className='seller'>{props.seller}</p>
        <h3 className='price'>$ {props.price}</h3>
        <BasicRating rating={props.rating}/>
        <h5>{props.reviews} reviews</h5>
        <Button variant="contained"  color='warning'   >
      <Link to={`/product/${props.id}`} style={{textDecoration:'none',color:'black',fontWeight:'550'}} >view details</Link>
    </Button>
    </div>
     </div>
    </>
  )
}
