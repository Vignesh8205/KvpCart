import axios from 'axios'

export const register =async (userformdata)=>{
  const config = {
  Headers:{
    'content-type':'multipart/form-data'
  }  
  }
    try {
    const {data} = await axios.post(`http://localhost:8000/api/v1/register`,userformdata,config)
    // console.log(data);
      return data
    } catch (error) {
        return (error.response.data.message);
    }
}

export const loaduser =async ()=>{
  axios.defaults.withCredentials  = true;
    try {
    const {data} = await axios.get(`http://localhost:8000/api/v1/myprofile`)
    // console.log(data);
      return data
    } catch (error) {
        return (error.response.data.message);
    }
}

export const logoutuser =async ()=>{
  axios.defaults.withCredentials  = true;
  
    try {
         await axios.get(`http://localhost:8000/api/v1/logout`)
    // console.log(data);
      return 
    } catch (error) {
        return (error.response.data.message);
    }
}


export const updateuser =async (userdata)=>{
  axios.defaults.withCredentials  = true;

  const config = {
    Headers:{
      'content-type':'multipart/form-data'
    }  
    }
  
    try {
   const {data}= await axios.put(`http://localhost:8000/api/v1/update`,userdata,config)
    console.log(data);
      return data
    } catch (error) {
        return (error.response.data.message);
    }
}

export const updatepassword =async (oldpassword,newpassword)=>{
  axios.defaults.withCredentials  = true;

    try {
        await axios.put(`http://localhost:8000/api/v1/password/change`,{oldPassword:oldpassword,password:newpassword})
   
      return 'password changed'
    } catch (error) {
        return (error.response.data.message);
    }
}


export const forgotpassword =async (userdata)=>{
  axios.defaults.withCredentials  = true;

 

    try {
    const {data} = await axios.post(`http://localhost:8000/api/v1/password/forgot`,{email:userdata})

      return data.message
    } catch (error) {
        return (error.response.data.message);
    }
}


export const resetpassword =async (password,confirmpassword,token)=>{
  axios.defaults.withCredentials  = true;




    try {
    const {data} = await axios.post(`http://localhost:8000/api/v1/password/reset/${token}`,{password:password,confirmPassword:confirmpassword})

      return data
    } catch (error) {
        return (error.response.data.message);
    }
}