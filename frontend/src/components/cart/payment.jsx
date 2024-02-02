import React, { useEffect, useState } from 'react'
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";

import { useNavigate } from 'react-router-dom';
import { validateShipping } from './shipping';
import axios from 'axios';
import { createOrder } from '../../actions/ordercontroler';

export default function Payment(props) {
    
    const [user,setuser]=useState(props.user)  
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const cartItems=JSON.parse(localStorage.getItem('items') || "[]")
  const  shippingInfo=JSON.parse(localStorage.getItem('shippinginfo') || "{}")

    const paymentData = {
        amount : Math.round( orderInfo.totalPrice * 100),
        shipping :{
            name: user.name,
            address:{
                city: shippingInfo.city,
                postal_code : shippingInfo.postalCode,
                country: shippingInfo.country,
                state: shippingInfo.state,
                line1 : shippingInfo.address
            },
            phone: shippingInfo.phoneNo
        }
    }
    const order = {
        orderItems: cartItems,
        shippingInfo
    }
    if(orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
        
    }

    useEffect(()=>{
        validateShipping(shippingInfo,navigate)
    },[]) 
    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector('#pay_btn').disabled = true;
        
        try {
            axios.defaults.withCredentials  = true;
 
            const {data} = await axios.post('http://localhost:8000/api/v1/payment/process', paymentData)
            const clientSecret = data.client_secret
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            })

            if(result.error){
               alert((await result).error.message)
                document.querySelector('#pay_btn').disabled = false;
            }else{
                if(( await result).paymentIntent.status === 'succeeded') {
                   
                   
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }

                    createOrder(order).then(res=>console.log(res))

                    localStorage.removeItem('shippinginfo');
                    localStorage.removeItem('items');
                    sessionStorage.removeItem('orderInfo');
                  

                    navigate('/order/success')
                }else{
                    alert('Please Try again!')
                    
                }
            }


        } catch (error) {
            
        }

        
    }

console.log(user);
  return (
    <>
      <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                    <h1 className="mb-4">Card Info</h1>
                    <div className="form-group">
                    <label htmlFor="card_num_field">Card Number</label>
                    <CardNumberElement
                        type="text"
                        id="card_num_field"
                        className="form-control"
                       
                    />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="card_exp_field">Card Expiry</label>
                    <CardExpiryElement
                        type="text"
                        id="card_exp_field"
                        className="form-control"
                       
                    />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="card_cvc_field">Card CVC</label>
                    <CardCvcElement
                        type="text"
                        id="card_cvc_field"
                        className="form-control"
                        value=""
                    />
                    </div>
        
                
                    <button
                    id="pay_btn"
                    type="submit"
                    className="btn btn-block py-3"
                    >
                    Pay - { ` $${orderInfo && orderInfo.totalPrice}` }
                    </button>
        
                </form>
            </div>
        </div>
    </>
  )
}
