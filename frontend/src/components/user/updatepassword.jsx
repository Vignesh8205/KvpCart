import React from 'react'
import {useEffect, useState } from 'react';
import { updatepassword } from '../../actions/registercontroller';
import { ToastContainer, toast } from 'react-toastify';

export default function Updatepassword() {
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append('oldPassword', oldPassword);
        // formData.append('password', password);

        updatepassword(oldPassword,password).then(res=>{
           if (res==='password changed') {
            setOldPassword('')
            setPassword('')
           
            toast(res,{
                type:'success',
                position:'bottom-center'
            })
           }else{
            toast(res,{
                type:'error',
                position:'bottom-center'
            })
           
           }
        } )
    }
  


  return (
    <>
    <ToastContainer/>
       <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                    <h1 className="mt-2 mb-5">Update Password</h1>
                    <div className="form-group">
                        <label htmlFor="old_password_field">Old Password</label>
                        <input
                            type="password"
                            id="old_password_field"
                            className="form-control"
                            value={oldPassword}
                            onChange={e=>setOldPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="new_password_field">New Password</label>
                        <input
                            type="password"
                            id="new_password_field"
                            className="form-control"
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                </form>
            </div>
        </div>
    </>
  )
}
