import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './ForgotPassword.css'
export default function ForgotPassword({setPasswordData}){
    const navigate=useNavigate();
    const [gmail,setGmail]=useState("");
    const handle=async(e)=>{
        e.preventDefault();
        const send={gmail};
        try{
        const response=await axios.post('https://event-managaement-system-backend.onrender.com/api/all/forgotPassword',send,{withCredentials:true});
        if(response.data.message=== 'otp send successfully'){
            setPasswordData(response.data.data);
            navigate('/OtpVerify');
        }    
    }catch(err){
        if(err.response?.data?.message=== 'Please do a signUp first'){
            alert('please do a sign up first');
            navigate('/');
        }else if(err.response?.data?.message==="something went wrong"){
            navigate('/');
        }
    }
    }
    return(
        <>
        <div className="forgot-page-container">
    <div className="forgot-form-wrapper">
        <h1>Enter your email here</h1>
        <form onSubmit={handle}  className="forgot-form">
 <input type="email" placeholder="enter your gmail here"  onChange={(e)=>setGmail(e.target.value)}/>
 <button type="submit">Click here</button>
        </form>
        </div>
        </div>
        </>
    );
}