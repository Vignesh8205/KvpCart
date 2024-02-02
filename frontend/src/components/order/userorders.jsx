import React, { useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom';
import {MDBDataTable} from 'mdbreact'
import { userorders } from '../../actions/ordercontroler';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Userorders() {
const [ userOrders,setuserOrders]=useState([])
    useEffect(()=>{
        userorders().then(res=>{
            if (res.success) {
                setuserOrders(res.orders)
            }

        })
    })

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: "Order ID",
                    field: 'id',
                    sort: "asc"
                },
                {
                    label: "Number of Items",
                    field: 'numOfItems',
                    sort: "asc"
                },
                {
                    label: "Amount",
                    field: 'amount',
                    sort: "asc"
                },
                {
                    label: "Status",
                    field: 'status',
                    sort: "asc"
                },
                {
                    label: "Actions",
                    field: 'actions',
                    sort: "asc"
                }
            ],
            rows:[]
        }

        userOrders?
        userOrders.forEach(userOrder => {
            data.rows.push({
                id:  userOrder._id,
                numOfItems: userOrder.orderItems.length,
                amount: `$${userOrder.totalPrice}`,
                status: userOrder.orderStatus && userOrder.orderStatus.includes('Delivered') ?
                (<p style={{color: 'green'}}> {userOrder.orderStatus} </p>):
                (<p style={{color: 'red'}}> {userOrder.orderStatus} </p>),
                actions: <Link to={`/order/${userOrder._id}`} className="btn btn-primary" >
                    <VisibilityIcon/>
                </Link>
            })
        }):null


        return  data;
    }


  return (
    <>
      <MetaData title={'My Orders'}/>
      <h1 className='mt-5'>My orders</h1>
      <MDBDataTable
                className='px-3'
                bordered
                striped
                hover
                data={setOrders()}
            />
    </>
  )
}
