import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './sidebar'
import { getAdminproducts } from '../../actions/productcontroller'

import {getAdminOrders} from '../../actions/ordercontroler'
import { getUsers } from '../../actions/usercontroler'

export default function Dashboard() {
 const [products,setproducts]=useState([])
 const [users,setusers]=useState([])
 let outofstock = 0;

 const [adminOrders,setadminOrders]=useState([])

    // admin order api reguest
   getAdminOrders().then(res=>{
    setadminOrders(res.orders)
   })


 useEffect(()=>{
    getAdminproducts().then(res=>{
        setproducts(res.products)
    })

    getUsers().then(res=>{
        setusers(res.users)
    })

   
       
    
    

 },[])

//out of  stock 
 if (products.length>0) {
    products.forEach(product=>{
        if (product.stock===0) {
            outofstock=outofstock+1;
        }
    })
}
// 
let totalamount=0
if (adminOrders.length>0) {
    adminOrders.forEach(orders=>{
      totalamount +=  orders.totalPrice
    })
}

  return (
    <div className="row">
            <div className="col-12 col-md-2">
                    {/* <Sidebar/> */}
                    <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Dashboard</h1>
                <div className="row pr-4">
                    <div className="col-xl-12 col-sm-12 mb-3">
                        <div className="card text-white bg-primary o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Total Amount<br /> <b>{totalamount}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row pr-4">
                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-success o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Products<br /> {products?<b>{products.length}</b>:null}</div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>
  

                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-danger o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Orders<br /> <b>{adminOrders?adminOrders.length:0}</b></div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>


                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-info o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Users<br /> <b>{users?users.length:0}</b></div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>


                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-warning o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Out of Stock<br /> <b>{outofstock}</b> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
