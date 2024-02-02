import axios from "axios";
export const addcart =async (id,quantity)=>{
    axios.defaults.withCredentials  = true;
 
//   localStorage.getItem('cartItems')?localStorage.getItem('cartItems'):[]
let  items=JSON.parse(localStorage.getItem('items') || "[]")
       try {
      const {data} = await axios.get(`http://localhost:8000/api/v1/product/${id}`)
    let cartItems={
        product:data.product._id,
        name:data.product.name,
        price:data.product.price,
        image:data.product.images[0].image,
        stock:data.product.stock,
        quantity
     }
     console.log(cartItems);
     console.log(items);
  let isitemexist=items.find(i=>i.product==cartItems.product)
     if (isitemexist) {
      return
     }else{
      items.push(cartItems)
      localStorage.setItem('items',JSON.stringify(items))
      // cart
    
     }
    
    
       
      } catch (error) {
        //   return (error.response.data.message);
      }
  }