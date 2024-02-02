import React from 'react'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js'

import './App.css'
import Header from './components/layout/header'
import Footer from './components/layout/footer'
import Home from './components/home'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'


import {HelmetProvider} from 'react-helmet-async'
import ProductDetail from './components/productDetail'
import Productsearch from './components/productsearch'
import Login from './components/user/login'
import Register from './components/user/register'
import Profile from './components/user/profile'
import { useState } from 'react'
import { useEffect } from 'react'
import { loaduser } from './actions/registercontroller'
import Updateprofile from './components/user/updateprofile'
import Updatepassword from './components/user/updatepassword'
import Forgotpassword from './components/user/forgotpassword'
import Resetpassword from './components/user/resetpassword'
import Cart from './components/cart/cart'
import Shipping from './components/cart/shipping'
import Confirmorder from './components/cart/confirmorder'
import Payment from './components/cart/payment'
import axios from 'axios'
import Ordersucess from './components/cart/ordersucess'
import Userorders from './components/order/userorders'
import Orderdetail from './components/order/orderdetail'
import { userorders } from './actions/ordercontroler'
import Dashboard from './components/admin/dashboard'
import Productlist from './components/admin/productlist'
import Newproduct from './components/admin/newproduct'
import UpdateProduct from './components/admin/updateProduct'
import Orderedlist from './components/admin/orderedlist'
import Orderupdate from './components/admin/orderupdate'
import Userlist from './components/admin/userlist'
import AdminUpdateuser from './components/admin/updateuser'
import Reviewslist from './components/admin/reviewslist'


function App() {

const [stripeApiKey,setstripeApiKey]=useState("")
  const [isathunticate,setisathunticate]=useState(false);
 const [user,setuser]=useState(null);
 useEffect(  ()=>{
  loaduser().then(res=>{
   
     setisathunticate(res.success)
     setuser(res.user)
  })

  async function getStripeApikey(){
    const {data} = await axios.get(`http://localhost:8000/api/v1/stripeapi`)
     
    setstripeApiKey(data.stripeApiKey)
  }
getStripeApikey()
// @stripe/react-stripe-js @stripe/stripe-js
//  console.log(success,user);
 },[isathunticate,stripeApiKey,user])
 
  return (
    <>
      <Router>
       <div>
          <HelmetProvider>
            <Header/>
              <Routes>
                
                  <Route path='/' element={ <Home/>} />
                  <Route path='/search/:keyword' element={ <Productsearch/>} />
                  <Route path='/search/' element={ <Productsearch/>} />
                  <Route path='/product/:id' element={ <ProductDetail user={user?user:null}/>} />
                  <Route path='/login' element={ <Login/>} />
                  <Route path='/register' element={ <Register/>} />
                  {user ?<Route path='/myprofile' element={ <Profile data={user}/>} />:null}
                  {user ?  <Route path='/myprofile/update' element={ <Updateprofile data={user} />} />:null}
                  {user ?  <Route path='/myprofile/update/password' element={ <Updatepassword />} />:null}
                  <Route path='/password/forgot' element={ <Forgotpassword />} />
                  <Route path='/password/reset/:token' element={ <Resetpassword />} />
                  <Route path='/cart' element={ <Cart user={user} />} />

                  <Route path='/shipping' element={ <Shipping />} />
                  <Route path='/order/confirm' element={ <Confirmorder />} />

                  {user ?<Route path='/payment' element={ <Elements stripe={loadStripe(stripeApiKey)}><Payment user={user}/></Elements> } />:null}
                  {user ?<Route path='/order/success' element={<Ordersucess/>} />:null}
                  {user ?<Route path='/orders' element={<Userorders/>} />:null}
                  {user ?<Route path='/order/:id' element={<Orderdetail name={user.name}/>} />:null}
                  



              </Routes>
                        {/* admin routes */}
              <Routes>
              {user ? <Route path='/admin/dashboard' element={user.role=='admin' ? <Dashboard/> : <Home/>} />:null}
              {user ? <Route path='/admin/products' element={user.role=='admin' ? <Productlist/> : <Home/>} />:null}
              {user ? <Route path='/admin/products/create' element={user.role=='admin' ? <Newproduct/> : <Home/>} />:null}
              {user ? <Route path='/admin/product/:id' element={user.role=='admin' ? <UpdateProduct/> : <Home/>} />:null}
              {user ? <Route path='/admin/orders' element={user.role=='admin' ? <Orderedlist/> : null} />:null}
              {user ? <Route path='/admin/order/:id' element={user.role=='admin' ? <Orderupdate/> : null} />:null}
              {user ? <Route path='/admin/users/' element={user.role=='admin' ? <Userlist/> : null} />:null}
              {user ? <Route path='/admin/user/:id' element={user.role=='admin' ? <AdminUpdateuser user={user}/> : null} />:null}
              {user ? <Route path='/admin/reviews' element={user.role=='admin' ? <Reviewslist/> : null} />:null}






              
              </Routes>
             
            <Footer/>
         </HelmetProvider>
    </div>
      </Router>
    </>
  )
}

export default App
