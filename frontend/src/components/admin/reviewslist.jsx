import React from 'react'
import { Fragment, useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import {ToastContainer, toast } from 'react-toastify'
import { MDBDataTable} from 'mdbreact';
import Sidebar from './sidebar';
import { deleteReview, getReviews } from '../../actions/productcontroller';
import Loader from '../loader/loader';
export default function Reviewslist() {

    const [loading, setloading] = useState(false);  
    const [reviews, setreviews] = useState([]);  
     
    const [productId, setProductId] = useState("");

    const setReviews = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows : []
        }

        reviews.forEach( review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                user : review.user.name,
                comment: review.comment ,
                actions: (
                    <Fragment>
                        <Button onClick={e => deleteHandler(e, review._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })

        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        deleteReview(productId,id).then((res)=>{
            if (res.success) {
                toast('Review Deleted Succesfully!',{
                    type: 'success',
                    position:'bottom-center'
                    
                })
            }else{
                toast(res,{
                    type: 'error',
                    position:'bottom-center'
                    
                })
            }

        })
        // dispatch(deleteReview(productId, id))
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        
        useEffect(()=>{
            getReviews(productId).then(res=>{
                console.log(res);
                if (res.success) {
                    setreviews(res.reviews)
                }
    
            })

        },[reviews])
        // dispatch(getReviews(productId))
    }

  

  return (
   <>
   <ToastContainer/>
    <div className="row">
    <div className="col-12 col-md-2">
            <Sidebar/>
    </div>
    <div className="col-12 col-md-10">
        <h1 className="my-4">Review List</h1>
        <div className="row justify-content-center mt-5">
            <div className="col-5">
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label >Product ID</label>
                        <input 
                            type="text"
                            onChange= {e => setProductId(e.target.value)}
                            value={productId}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" disabled={loading} className="btn btn-primary btn-block py-2">
                        Search
                    </button>
                </form>
            </div>
        </div>
        <Fragment>
            {loading ? <Loader/> : 
                <MDBDataTable
                    data={setReviews()}
                    bordered
                    striped
                    hover
                    className="px-3"
                />
            }
        </Fragment>
    </div>
   </div>
   </>
  )
}
