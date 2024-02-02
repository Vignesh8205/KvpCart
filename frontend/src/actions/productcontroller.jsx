import axios from 'axios'

export const createreview =async (reviewData)=>{
    axios.defaults.withCredentials  = true;
    const config = {
        headers : {
            'Content-type': 'application/json'
        }
    }

      try {
      const  {data} =  await axios.put(`http://localhost:8000/api/v1/review`,reviewData,config)
      // console.log(data);
        return data
      } catch (error) {
          return (error.response.data.message);
      }
  }


  export const  getAdminproducts = async ()=>{
    axios.defaults.withCredentials  = true;
    
    try {

       const {data} = await axios.get(`http://localhost:8000/api/v1/admin/products`)
     
       return data
    } catch (error) {
        return (error.response.data.message);
    }
  }

  export const  createNewproduct = async (productData)=>{
    axios.defaults.withCredentials  = true;
    const config = {
      Headers:{
        'content-type':'multipart/form-data'
      }  
      }
    try {

        const {data} = await axios.post(`http://localhost:8000/api/v1/admin/product/new`,productData,config)
     
         return data
    } catch (error) {
         return (error.response.data.message);
    }
  }

  export const  deleteProduct = async (id)=>{
    axios.defaults.withCredentials  = true;

    
   
    try {

        const {data} = await axios.delete(`http://localhost:8000/api/v1/admin/product/${id}`)
     
         return data
    } catch (error) {
         return (error.response.data.message);
    }
  }


  export const  updateProduct = async (id,formdata)=>{
    axios.defaults.withCredentials  = true;
    const config = {
      Headers:{
        'content-type':'multipart/form-data'
      }  
      }
    try {

        const {data} = await axios.put(`http://localhost:8000/api/v1/admin/product/${id}`,formdata,config)
     
         return data
    } catch (error) {
         return (error.response.data.message);
    }
  }


  export const getReviews =  async (id) => {

    try {  
     
        const { data }  =  await axios.get(`http://localhost:8000/api/v1/admin/reviews`,{params: {id}});
       
        return data
        
    } catch (error) {
        //handle error
        return (error.response.data.message)
    }
    
}

export const deleteReview =    async(productId, id) => {

  try {  
      
   const {data} =  await axios.delete(`http://localhost:8000/api/v1/admin/review`,{params: {productId, id}});
     return data
  } catch (error) {
      //handle error
     return (error.response.data.message)
  }
  
}


