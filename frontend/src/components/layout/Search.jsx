import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom';
export default function SearchComponent(props) {

   const navigate=useNavigate();
   const [keyword,setkeyword]=useState("");

  const location= useLocation();

    const searchHandler = (e) =>{
        e.preventDefault();
        navigate(`/search/${keyword }`)

    }
   
   useEffect(()=>{
   
   })


  return (
    <>
    <form onSubmit={searchHandler}>
    <div className='input-group'>
        <input type="text" id='search_field'  className='form-control' placeholder='Enter product Name...' value={keyword} onChange={(e)=>{setkeyword(e.target.value)}}/>
        <div className='input-group-append'>
            <button id='search_btn' className='btn'  >
                <SearchIcon sx={{fontSize:'35px'}}/>
            </button>

        </div>
    </div>
    </form>
    </>
  )
}
