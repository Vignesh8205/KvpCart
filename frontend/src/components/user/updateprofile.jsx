import React,{useEffect, useState} from 'react'
import { updateuser } from '../../actions/registercontroller';
import MetaData from '../layout/MetaData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Updateprofile(props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const onChangeAvatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
             if(reader.readyState === 2) {
                 setAvatarPreview(reader.result);
                 setAvatar(e.target.files[0])
             }
        }


        reader.readAsDataURL(e.target.files[0])
    }
    const submitHandler  = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name)
        formData.append('email', email)
        formData.append('avatar', avatar);

      updateuser(formData).then(res=>{
        if(res.success){
            toast('successfully updated',{
                type:'success',
                position:'bottom-center'
            })
           
        }
    })
    }

    useEffect(()=>{
        if(props.data){
            setName(props.data.name)
            setEmail(props.data.email)
            if (props.data.avatar) {
                setAvatarPreview(props.data.avatar)
            }
        }

    },[props.data])

  return (
    <>
    <ToastContainer/>
    <MetaData title={'Edit-profile'}/>
        <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                <h1 className="mt-2 mb-5">Update Profile</h1>

                <div className="form-group">
                    <label htmlFor="email_field">Name</label>
                    <input 
                        type="name" 
                        id="name_field" 
                        className="form-control"
                        name='name'
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email_field">Email</label>
                    <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        name='email'
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
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
                                    alt='Avatar Preview'
                                />
                            </figure>
                        </div>
                        <div className='custom-file'>
                            <input
                                type='file'
                                name='avatar'
                                className='custom-file-input'
                                id='customFile'
                                onChange={onChangeAvatar}
                            />
                            <label className='custom-file-label' htmlFor='customFile'>
                                Choose Avatar
                        </label>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
            </form>
        </div>
    </div>
    </>
  )
}
