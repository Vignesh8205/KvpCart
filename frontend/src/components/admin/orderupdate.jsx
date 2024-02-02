import React from 'react'
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import Sidebar from './sidebar';
import { orderdetails, updateAdminOrder } from '../../actions/ordercontroler';

export default function Orderupdate() {
  
  const [loading,setloading]=useState(true)
  const [orderDetail,setorderDetail]=useState([])
  const { shippingInfo={}, user={}, orderStatus="Processing", orderItems=[], totalPrice=0, paymentInfo={} } = orderDetail;


  const isPaid = paymentInfo.status === 'succeeded'? true: false;
  const [OrderStatus, setOrderStatus] = useState("Processing");
  const { id} = useParams();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const orderData = {};
    orderData.orderStatus = OrderStatus;
    updateAdminOrder(id,orderData).then(res=>{
      if(res.success){
        toast('Ordered Updated Successfully',{
          type:'success',
          position:'bottom-center'
        })
      }else{
       
        toast(res,{
          type:'error',
          position:'bottom-center'
        })
      }
    })
 
}

const oldData=()=>{

  orderdetails(id).then(res=>{
    if (res.success) {
      setloading(false)
      setorderDetail(res.order)
  }
  })
}

useEffect(()=>{
  

},[])

  return (
    <>
    <ToastContainer/>
       <div className="row">
            <div className="col-12 col-md-2">
                    <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
              <button onClick={oldData} className='btn btn-primary mt-2'>Old Data or Reset</button>
                <Fragment>
                <div className="row d-flex justify-content-around">
                        <div className="col-12 col-lg-8 mt-5 order-details">
    
                            <h1 className="my-5">Order # {orderDetail._id}</h1>
    
                            <h4 className="mb-4">Shipping Info</h4>
                            <p><b>Name:</b> {user.name}</p>
                            <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                            <p className="mb-4"><b>Address:</b>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}</p>
                            <p><b>Amount:</b> ${totalPrice}</p>
    
                            <hr />
    
                            <h4 className="my-4">Payment</h4>
                            <p className={isPaid ? 'greenColor' : 'redColor' } ><b>{isPaid ? 'PAID' : 'NOT PAID' }</b></p>
    
    
                            <h4 className="my-4">Order Status:</h4>
                            <p className={orderStatus&&orderStatus.includes('Delivered') ? 'greenColor' : 'redColor' } ><b>{orderStatus}</b></p>
    
    
                            <h4 className="my-4">Order Items:</h4>
    
                            <hr />
                            <div className="cart-item my-1">
                                {orderItems && orderItems.map(item => (
                                    <div className="row my-5">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>


                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>${item.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item.quantity} Piece(s)</p>
                                        </div>
                                    </div>
                                ))}
                                    
                            </div>
                            <hr />
                        </div>
                        <div className="col-12 col-lg-3 mt-5">
                            <h4 className="my-4">Order Status</h4>
                            <div className="form-group">
                                <select 
                                className="form-control"
                                onChange={e => setOrderStatus(e.target.value)}
                                value={OrderStatus}
                                name="status"
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                              
                            </div>
                            <button
                                disabled={loading}
                                onClick={submitHandler}
                                className="btn btn-primary btn-block"
                                >
                                    Update Status
                            </button>

                        </div>
                    </div>
                </Fragment>
            </div>
        </div>
    </>
  )
}
