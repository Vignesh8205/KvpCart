import React,{useState} from 'react'
import { forgotpassword } from '../../actions/registercontroller';

export default function Forgotpassword() {
    const [email, setEmail] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        
      forgotpassword(email).then(res=>{
        alert(res)
      })
    }
// 70db976c2b1e676a37437c79243958196e94d68f
  return (
    <>
       <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                    <h1 className="mb-3">Forgot Password</h1>
                    <div className="form-group">
                        <label htmlFor="email_field">Enter Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        id="forgot_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        Send Email
                </button>

                </form>
            </div>
        </div>
    </>
  )
}
