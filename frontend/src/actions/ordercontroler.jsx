import axios from "axios";
export const createOrder = async (order)=>{
    axios.defaults.withCredentials  = true;

       try {
       const {data} = await axios.post(`http://localhost:8000/api/v1/order/new`,order)

          return data

      } catch (error) {
           return error.response.data.message
      }
  }

  export const userorders = async ()=>{
    axios.defaults.withCredentials  = true;

       try {
       const {data} = await axios.get(`http://localhost:8000/api/v1/myorders`)

          return data

      } catch (error) {
           return error.response.data.message
      }
  }

  export const orderdetails = async (id)=>{
    axios.defaults.withCredentials  = true;

       try {
       const {data} = await axios.get(`http://localhost:8000/api/v1/order/${id}`)

          return data

      } catch (error) {
           return error.response.data.message
      }
  }


//   admin orders
  export const getAdminOrders = async ()=>{
    axios.defaults.withCredentials  = true;

       try {
       const {data} = await axios.get(`http://localhost:8000/api/v1/admin/orders`)

          return data

      } catch (error) {
           return error.response.data.message
      }
  }

  export const deleteAdminOrder = async (id)=>{
    axios.defaults.withCredentials  = true;

       try {
       const {data} = await axios.delete(`http://localhost:8000/api/v1/admin/order/${id}`)

          return data

      } catch (error) {
           return error.response.data.message
      }
  }

  export const updateAdminOrder = async (id,updateData)=>{
    axios.defaults.withCredentials  = true;

       try {
       const {data} = await axios.put(`http://localhost:8000/api/v1/admin/order/${id}`,updateData)

          return data

      } catch (error) {
           return error.response.data.message
      }
  }