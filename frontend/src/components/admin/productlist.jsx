
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteProduct, getAdminproducts } from '../../actions/productcontroller'
import Loader from '../loader/loader'
import { MDBDataTable} from 'mdbreact';
import {ToastContainer, toast } from 'react-toastify'
import { Button } from "react-bootstrap"
import Sidebar from './sidebar';



export default function Productlist() {
    const [products,setproducts]=useState([])
    const [loading,setloading]=useState(true)
    
    useEffect(()=>{
        getAdminproducts().then(res=>{
            if (res.success) {
                setloading(false)
                setproducts(res.products)
            }
        })

     },[products])

     const deleteHandler = (e,id) => {
        
     
     deleteProduct(id).then(res=>{
       if(res.message=="Product Deleted!"){
        toast(res.message,{
            type:'success',
            position:'bottom-center'
        })
       }else{
        toast(res.message,{
            type:'error',
            position:'bottom-center'
        })
       }
    
     })
        

    }


     const setProducts = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
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

        products.forEach( product => {
            
            data.rows.push({
                id: product._id,
                name: product.name,
                price : `$${product.price}`,
                stock: product.stock,
                actions: (
                    <Fragment>
                        <Link to={`/admin/product/${product._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, product._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })

        return data;
    }


  return (
    <>
    <ToastContainer/>
       <div className="row">
        <div className="col-12 col-md-2">
                <Sidebar/>
        </div>
        <div className="col-12 col-md-10">
            <h1 className="my-4">Product List</h1>
            <Fragment>
                {loading ? <Loader/> : 
                    <MDBDataTable
                        data={setProducts()}
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
