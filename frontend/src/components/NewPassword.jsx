import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './NewPassword.css';
export default function NewPassword(){
    const navigate=useNavigate();
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const handle=async(e)=>{
        e.preventDefault();
        const send={password,confirmPassword};
        try{
        const response=await axios.post("https://event-managaement-system-backend.onrender.com/api/all/changePassword",send,{withCredentials:true})
        if(response.data.message==="change successfull"){
            navigate('/signIn');
        }
        }catch(err){
            if(err.response?.data?.message==='enter detail properly'){
                alert('fill detail properly');
            }else if(err.response?.data?.message==='fill your detail properly'){
                alert('password and incorrect password does not match');
            }else if(err.response?.data?.message==='user not found'){
                alert('do a sign up first');
                navigate('/');
            }
        }
    }
    return(
        <>
        <div className="newpass-page-container">
    <div className="newpass-form-wrapper">
        <h1>Enter your password here</h1>
        <form onSubmit={handle} className="newpass-form">
 <input type="password" placeholder="Enter your newPassword here" onChange={(e)=>setPassword(e.target.value)}/>
 <input type="password" placeholder="Enter your confirmPassword here" onChange={(e)=>setConfirmPassword(e.target.value)}/>
 <button type="submit">click here</button>
        </form>
        </div>
        </div>
        </>
    );
}