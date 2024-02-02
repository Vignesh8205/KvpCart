import React from 'react'
import { Fragment, useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from '../../actions/productcontroller';
export default function UpdateProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState("");
    const [images, setImages] = useState([]);
    const [imagesCleared, setImagesCleared] = useState(false);
    const [imagesPreview, setImagesPreview] = useState([]);
    const { id} = useParams();
   

 
    const [loading,setloading]=useState(false)
    const [product,setproduct]=useState({})

    const productdata= async ()=>{

        await axios.get(`http://localhost:8000/api/v1/product/${id}`).then(res=>{
         
          setproduct(res.data.product)

          if (product._id) {
            setName(product.name);
            setPrice(product.price);
            setStock(product.stock);
            setDescription(product.description);
            setSeller(product.seller);
            setCategory(product.category);
            
            let images = [];
            product.images.forEach( image => {
                images.push(image.image)
            });
            setImagesPreview(images)
        }

         
       })
      }
    

    
    const categories = [
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ];

    const navigate = useNavigate();
    const onImagesChange = (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState == 2 ) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, file])
                }
            }

            reader.readAsDataURL(file)


        })

    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name' , name);
        formData.append('price' , price);
        formData.append('stock' , stock);
        formData.append('description' , description);
        formData.append('seller' , seller);
        formData.append('category' , category);
        images.forEach (image => {
            formData.append('images', image)
        })
        formData.append('imagesCleared' , imagesCleared);
        // dispatch(updateProduct(productId, formData))
        updateProduct(id,formData).then(res=>{
            if(res.success){
                toast('Product Updated Successfully',{
                    type:'success',
                    position:'bottom-center'
                })
            }else{
                toast('Product can not Update ',{
                    type:'error',
                    position:'bottom-center'
                })
            }
        })
    }

    const clearImagesHandler = () => {
        setImages([]);
        setImagesPreview([]);
        setImagesCleared(true);
    }



   

   useEffect(()=>{

    

    

   },[product])   


  return (
    <>
    <ToastContainer/>
    
        <div className="row">
            <div className="col-12 col-md-2">
            
                    <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
            <button className='btn btn-warning mt-2' onClick={productdata}>Old Data or Reset</button>
                <Fragment>
                    <div className="wrapper my-5"> 
                        <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-4">Update Product</h1>

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
                                <label htmlFor="price_field">Price</label>
                                <input
                                type="text"
                                id="price_field"
                                className="form-control"
                                onChange={e => setPrice(e.target.value)}
                                value={price}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea 
                                    className="form-control"
                                    id="description_field" 
                                    rows="8"
                                    onChange={e => setDescription(e.target.value)}
                                    value={description}
                                  ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select value={category} onChange={e => setCategory(e.target.value)} className="form-control" id="category_field">
                                    <option value="">Select</option>
                                    {categories.map( category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock_field">Stock</label>
                                <input
                                type="number"
                                id="stock_field"
                                className="form-control"
                                onChange={e => setStock(e.target.value)}
                                value={stock}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="seller_field">Seller Name</label>
                                <input
                                type="text"
                                id="seller_field"
                                className="form-control"
                                onChange={e => setSeller(e.target.value)}
                                value={seller}
                                />
                            </div>
                            
                            <div className='form-group'>
                                <label>Images</label>
                                
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            multiple
                                            onChange={onImagesChange}
                                        
                                        />

                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                        </label>
                                    </div>

                                    { imagesPreview.length > 0 &&  <span className="mr-2" onClick={clearImagesHandler} style={{cursor: "pointer"}}><i className="fa fa-trash"></i></span>}
                                    {imagesPreview.map(image => (
                                        <img
                                            className="mt-3 mr-2"
                                            key={image}
                                            src={image}
                                            alt={`Image Preview`}
                                            width="55"
                                            height="52"
                                        />
                                    ))}
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
