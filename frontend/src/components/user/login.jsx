import React,{useState} from 'react'
import MetaData from '../layout/MetaData';
import { login } from '../../actions/usercontroler';
import {useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Login() {
  const [isathunticate,setissthunticate]=useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // data
const location = useLocation()
// nvigation



const redirect = location.search?'/'+location.search.split('=')[1]:'/';


const navigate=useNavigate();


  const  submitHandler = (e) => {
    e.preventDefault();
login(email,password).then(res=>{

  if(res.success){
  
    setissthunticate(res.success)
    if (isathunticate) {
      toast('login Successfully',{
        type:'success',
        position:'bottom-center'
      })
      setInterval(() => {
    
        navigate(redirect)
        
      }, 3000);
    }
    // navigate(redirect) 
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
      <MetaData title={`Login`} />
            <div className="row wrapper"> 
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mb-3">Login</h1>
                        <div className="form-group">
                         <label htmlFor="email_field">Email</label>
                         <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            onChange={e =>setEmail(e.target.value)}
                        />
                        </div>
            
                        <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={e =>setPassword(e.target.value)}
                        />
                        </div>

                        <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
            
                        <button
                        id="login_button"
                        type="submit"
                        className="btn btn-block py-3"
                       >
                        LOGIN
                        </button>

                        <Link to="/register" className="float-right mt-3">New User?</Link>
                    </form>
                </div>
            </div> 
    </>
  )
}
