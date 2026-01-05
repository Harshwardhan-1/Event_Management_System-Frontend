import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './OtpVerify.css';
export default function OtpVerify({passwordData}){
    const navigate=useNavigate();
    const [otp,setOtp]=useState("");
    const handle=async(e)=>{
        e.preventDefault();
    const send={otp};
    try{
    const response=await axios.post('https://event-managaement-system-backend.onrender.com/api/all/OtpVerify',send,{withCredentials:true});
    if(response.data.message==="User enter correct otp"){
        navigate("/NewPassword");
    }
    }catch(err){
        if(err.response?.data?.message==='user not found'){
            alert('please do a sign upfirst');
            navigate('/');
        }else if(err.response?.data?.message=== 'user has not yet click forgot password'){
            alert('Enter correct otp');
        }else if(err.reponse?.data?.message==="please enter correct otp"){
            alert('otp invalid');
        }else if(err.response?.data?.message==='Enter otp correctly'){
            alert('enter otp correctly');
        }else if(err.response?.data?.message=== 'incorrect otp'){
            alert('you enter incorrect otp');
        }
    }
    }
    return(
        <>
        <div className="otp-page-container">
    <div className="otp-form-wrapper">
        <h1>Enter your otp here</h1>
        <p>{passwordData.name} enter your otp here</p>
        <form onSubmit={handle} className="otp-form">
            <input type="text" placeholder="Enter your otp here"  onChange={(e)=>setOtp(e.target.value)} />
            <button type="submit" >Click me</button>
        </form>
        </div>
        </div>
        </>
    );
}