import React, { useState } from 'react'
import { Fragment, useEffect } from "react"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { MDBDataTable} from 'mdbreact';
import {ToastContainer, toast } from 'react-toastify'
import Sidebar from './sidebar';
import { deleteUser, getUsers } from '../../actions/usercontroler';
export default function Userlist() {
    
 const [users,setusers]=useState([])
 const [loading,setloading]=useState(false)

 useEffect(()=>{

     getUsers().then(res=>{
       if(res.success){
           setusers(res.users)
   
       }
     })

 },[users])

    const setUsers = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows : []
        }

        users.forEach( user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email : user.email,
                role: user.role ,
                actions: (
                    <Fragment>
                        <Link to={`/admin/user/${user._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, user._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })

        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        deleteUser(id).then(res=>{
            if (res.success) {
                toast('User deleted successfully',{
                    type:'success',
                    position:'bottom-center'
                })
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
         <div className="row">
        <div className="col-12 col-md-2">
                <Sidebar/>
        </div>
        <div className="col-12 col-md-10">
            <h1 className="my-4">User List</h1>
            <Fragment>
                {loading ? <Loader/> : 
                    <MDBDataTable
                        data={setUsers()}
                        bordered
                        striped
                        hover
                        className="px-3"
                    />
                }
            </Fragment>
        </div>
    </div>
    </>
  )
}
