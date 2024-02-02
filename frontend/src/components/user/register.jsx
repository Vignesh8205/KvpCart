import React,{useEffect, useState} from 'react'
import { register } from '../../actions/registercontroller';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { ToastContainer, toast } from 'react-toastify';
// import { errorMonitor } from 'nodemailer/lib/xoauth2';

export default function Register() { 
    const navigate=useNavigate()
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");

    const onChange = (e) => {
        if(e.target.name === 'avatar') {
           const reader = new FileReader();
           reader.onload = () => {
                if(reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0])
                }
           }


           reader.readAsDataURL(e.target.files[0])
        }else{
            setUserData({...userData, [e.target.name]:e.target.value })
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userData.name)
        formData.append('email', userData.email)
        formData.append('password', userData.password)
        formData.append('avatar', avatar);

       register(formData).then(res=>{
        if(res.success){
            toast('register Successfully',{
                type:'success',
                position:'bottom-center'
            })
            setInterval(() => {

                navigate('/')
                
            }, 3000);

        }else{
            toast(res,{
                type:'error',
                position:'bottom-center'
            })
          
        }
       })
    }

   
  return (
    <>
    <ToastContainer/>
    <MetaData title={'register'}/>
      <div className="row wrapper">
            <div className="col-10 col-lg-5">
            <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                <h1 className="mb-3">Register</h1>

            <div className="form-group">
                <label htmlFor="email_field">Name</label>
                <input name='name' onChange={onChange} type="name" id="name_field" className="form-control" />
            </div>

                <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                    type="email"
                    id="email_field"
                    name='email' 
                    onChange={onChange}
                    className="form-control"
                  
                />
                </div>
    
                <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                    name='password' 
                    onChange={onChange}
                    type="password"
                    id="password_field"
                    className="form-control"
                  
                />
                </div>

                <div className='form-group'>
                <label htmlFor='avatar_upload'>Avatar</label>
                <div className='d-flex align-items-center'>
                    <div>
                        <figure className='avatar mr-3 item-rtl'>
                            <img
                                src={avatarPreview}
                                className='rounded-circle'
                                alt='Avatar'
                            />
                        </figure>
                    </div>
                    <div className='custom-file'>
                        <input
                            type='file'
                            name='avatar'
                            onChange={onChange}
                            className='custom-file-input'
                            id='customFile'
                        />
                        <label className='custom-file-label' htmlFor='customFile'>
                            Choose Avatar
                        </label>
                    </div>
                </div>
            </div>
    
                <button
                id="register_button"
                type="submit"
                className="btn btn-block py-3"
               
                >
                REGISTER
                </button>
            </form>
            </div>
        </div>
    </>
  )
}
