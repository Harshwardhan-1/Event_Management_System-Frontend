import {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './SignInPage.css'
export default function SignInPage({setUserData}){
    const navigate=useNavigate();
    const [gmail,setGmail]=useState("");
    const [password,setPassword]=useState("");
    const handle=async(e)=>{
        e.preventDefault();
        const send={gmail,password};
        try{
        const response=await axios.post("https://event-managaement-system-backend.onrender.com/api/all/getSignIn",send,{withCredentials:true});
        if(response.data.message==="Login Successfully"){
            setUserData(response.data.data);
            navigate('/HomePage');
        }
    }catch(err){
        if(err.response?.data?.message==="Something went Wrong"){
            alert('please do signUp first');
            navigate('/');
        }else if(err.response?.data?.message==="Something went wrong"){
            alert('enter correct password');
        }
    }
}
    return(
        <>
         <div className="signin-page-container">
            <div className="signin-form-wrapper">
         <h1>Welcome to Login Page</h1>
         <form onSubmit={handle} className="signin-form">
            <input type="email" placeholder="Enter your gmail here"  onChange={(e)=>setGmail(e.target.value)} />
            <input type="password" placeholder='Enter your password here' onChange={(e)=>setPassword(e.target.value)} />
            <input type="submit" />
         </form>
         <p>dont have an account go to <Link to='/' >SignUpPage</Link></p>
         </div>
         </div>
        </>
    );
}