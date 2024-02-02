import React, { useState } from 'react'
import { Fragment, useEffect } from "react"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { MDBDataTable} from 'mdbreact';
import {ToastContainer, toast } from 'react-toastify'
import Sidebar from './sidebar';
import Loader from '../loader/loader';
import { deleteAdminOrder, getAdminOrders } from '../../actions/ordercontroler';

export default function Orderedlist() {

    const [loading,setloading]=useState(false)
    const [adminOrders,setadminOrders]=useState([])

    // admin order api reguest
   getAdminOrders().then(res=>{
    setadminOrders(res.orders)
   })
   

    const setOrders = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Number of Items',
                    field: 'noOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
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

        adminOrders.forEach( order => {
            data.rows.push({
                id: order._id,
                noOfItems: order.orderItems.length,
                amount : `$${order.totalPrice}`,
                status: <p style={{color: order.orderStatus.includes('Processing') ? 'red' : 'green'}}>{order.orderStatus}</p> ,
                actions: (
                    <Fragment>
                        <Link to={`/admin/order/${order._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, order._id)} className="btn btn-danger py-1 px-2 ml-2">
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
      deleteAdminOrder(id).then(res=>{
        if(res.success){
            toast('Ordered Deleted Successfully',{
                type:'success',
                position:'bottom-center'
            })
        }else{
            toast('Ordered Deleted failed',{
                type:'error',
                position:'bottom-center'
            })
        }
      })
    }

  return (

    <>
<ToastContainer/>
<div className="row">
        <div className="col-12 col-md-2">
                <Sidebar/>
        </div>
        <div className="col-12 col-md-10">
            <h1 className="my-4">Order List</h1>
            <Fragment>
                {loading ? <Loader/> : 
                    <MDBDataTable
                        data={setOrders()}
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
