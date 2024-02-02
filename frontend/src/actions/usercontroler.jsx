import axios from 'axios'
export const login =async (email,password)=>{
  axios.defaults.withCredentials = true;
    try {
    const {data} = await axios.post(`http://localhost:8000/api/v1/login`,{email,password})
    // console.log(data);
      return data
    } catch (error) {
        return (error.response.data.message);
    }

}

// adimin 
export const getUsers =  async () => {

  try {
     
    const { data }  = await axios.get(`http://localhost:8000/api/v1/admin/users`);
    
    return data
  } catch (error) {
      return (error.response.data.message)
  }

}

export const deleteUser = async (id) => {

  try {
     
 const   {data}  = await axios.delete(`http://localhost:8000/api/v1/admin/user/${id}`);
     return data
  } catch (error) {
      return  (error.response.data.message)
  }

}

export const getUser = async (id) => {

  try {
     
 const   {data}  = await axios.get(`http://localhost:8000/api/v1/admin/user/${id}`);
     return data
  } catch (error) {
      return  (error.response.data.message)
  }

}


export const adminupdateUser =  async  (id, formData)  => {

  try {
     
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      }
    const {data} = await axios.put(`http://localhost:8000/api/v1/admin/user/${id}`, formData, config);
     
    return data

  } catch (error) {
    return  (error.response.data.message)
  }

}