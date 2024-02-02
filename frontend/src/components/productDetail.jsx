import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import MetaData from './layout/MetaData';
import BasicRating from './card/ratting';
import axios from 'axios';
import ControlledCarousel from './carousel/carousel';
import Loader from './loader/loader'
import { addcart } from '../actions/cartcontroler';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createreview } from '../actions/productcontroller';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Productreview from './productreview';

export default function ProductDetail({user}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");

    const reviewHandler = () => {
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('comment', comment);
        formData.append('productId', id);

        createreview(formData).then(res=>{
          if(res.success){
          toast('review submited successfully',{
              type:'success',
              position:'bottom-center',
          })
            
            handleClose()
          }else{
            toast('review failed ',{
              type:'error',
              position:'bottom-center',
          })
          }
        })
      

    }


    const [quantity,setquantity]=useState(1)
    const increaseQty = () => {
        const count = document.querySelector('.count')
        if(product.stock ==0 ||  count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setquantity(qty);
    }
    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if(count.valueAsNumber == 1 ) return;
        const qty = count.valueAsNumber - 1;
        setquantity(qty);
    }

    const {id}= useParams()
    const [product,setproduct]=useState([])
    const [sts,setsts]=useState(false)
    const test= async ()=>{
          await axios.get(`http://localhost:8000/api/v1/product/${id}`).then(res=>{
            setsts(res.data.success);
            setproduct(res.data.product)
        })
        }

       
   const  cartadd=()=>{
         addcart(id,quantity)
         toast('Cart added',{
          type:'success',
          position:'bottom-center'
         })
       }
        
    
    useEffect(()=>{

        
        test()
    },[user])

  return (
   <>
  <ToastContainer/>
   {
    
    // condition checking
    sts?<div className='product'>
     
     <MetaData title={product.name} />
     <div className="row f-flex justify-content-around">
         <div className="col-12 col-lg-5 img-fluid carousel  mt-5" id="product_image">
            {
                // product.images.map(res=>{
                //     return(
                //     <>
                    <ControlledCarousel image={product.images[0].image}/>
                //     </>
                //     )
                // })
            }
           
            
            {/* <img src={} alt="product image" className='col-12 col-lg-5 img-fluid' /> */}
         </div>

         <div className="col-12 col-lg-5 mt-5 detail">
         <h3>{product.name}</h3>
         <p id="product_id">Product # Id {id} </p>
         <hr/>

         <BasicRating rating={Number(product.ratings)}/>
         <span id="no_of_reviews">( {product.numOfReviews} Reviews)</span>

         <hr/>

         <p id="product_price">$ {product.price}</p>
         <div className="stockCounter d-inline">
             <span className="btn btn-danger minus" onClick={decreaseQty}  >-</span>

             <input type="number" className="form-control count d-inline" value={quantity}  readOnly />

             <span className="btn btn-primary plus" onClick={increaseQty} >+</span>
         </div>
         <button type="button" id="cart_btn" 
         
          className="btn btn-primary d-inline ml-4"
          disabled={product.stock==0?true:false}  onClick={cartadd}  >Add to Cart</button>

         <hr/>

         <p>Status: <span className={product.stock > 0 ?'greenColor':'redColor'} id="stock_status">{ product.stock > 0 ?'In Stock':'Out of Stock'}</span></p>

         <hr/>

         <h4 className="mt-2">Description:</h4>
         <p>{product.description}</p>
         <hr/>
         <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
{
     user?    <button id="review_btn" type="button" className="btn btn-primary mt-4" onClick={handleShow} >
                     Submit Your Review
         </button>  : <div className='alert alert-danger mt-5'>Login to post Review </div>      

}
     </div>

     </div>
     {
      product.reviews && product.reviews.length>0?<Productreview reviews={product.reviews}/>:null
     }
</div>:<Loader/>}
{
    show?<div>
         <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul  >
        {
            [1,2,3,4,5].map(star => (
                     <li 
                     value={star}
                     className={`star ${star<=rating?'orange':''}`}
                     onMouseOver={(e) => e.target.classList.add('yellow')}
                     onMouseOut={(e) => e.target.classList.remove('yellow')}
                     onClick={()=>setRating(star)} >{star}</li>                                          ))
         }                    
      </ul>

                   <textarea  onChange={(e)=>setComment(e.target.value)} name="review" id="review" className="form-control mt-3">

                   </textarea>
               {/* <button disabled={sts} onClick={reviewHandler}   aria-label="Close" className="btn my-3 float-right review-btn px-4 text-white">Submit</button> */}
                              
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={reviewHandler}>
          Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>:null
     }
   </>
  )
}
