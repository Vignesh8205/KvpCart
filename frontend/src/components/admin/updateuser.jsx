import React from 'react'
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { adminupdateUser, getUser } from '../../actions/usercontroler';
import Sidebar from './sidebar';

export default function AdminUpdateuser(props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [user, setuser] = useState({});
    const [authUser,setauthUser]=useState(props.user)
   
    const { id:userId } = useParams();

    const oldData = ()=>{
        getUser(userId).then(res=>{
           if(res.success){
               setuser(res.user)
               // if(user._id) {
                   setName(res.user.name);
                   setEmail(res.user.email);
                   setRole(res.user.role);
               // }
       
           }
        })

    }
   
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name' , name);
        formData.append('email' , email);
        formData.append('role' , role);

        adminupdateUser(userId,formData).then(res=>{
            if (res.success) {
                toast('user detail updated successfully',{
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

   const [loading,setloading]=useState(false)

  return (
    <>
    <ToastContainer/>
    <div className="row">
            <div className="col-12 col-md-2">
                    <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
                <button onClick={oldData} className='btn btn-primary mt-2'>oldData or Reset</button>
                <Fragment>
                    <div className="wrapper my-5"> 
                        <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-4">Update User</h1>

                            <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                onChange={e => setName(e.target.value)}
                                value={name}
                            />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Email</label>
                                <input
                                type="text"
                                id="price_field"
                                className="form-control"
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category_field">Role</label>
                                <select disabled={user._id === authUser._id } value={role} onChange={e => setRole(e.target.value)} className="form-control" id="category_field">
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            <button
                            id="login_button"
                            type="submit"
                            disabled={loading}
                            className="btn btn-block py-3"
                            >
                            UPDATE
                            </button>

                        </form>
                    </div>
                </Fragment>
            </div>
        </div>
    </>
  )
}
