import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './SignUpPage.css';
export default function SignUpPage(){
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const [gmail,setGmail]=useState("");
    const [password,setPassword]=useState("");
    const handle=async(e)=>{
        e.preventDefault();
        try{
        const send={name,gmail,password};
        const response=await axios.post("https://event-managaement-system-backend.onrender.com/api/all/getSignUp",send,{withCredentials:true});
        if(response.data.message==="Successfully Login"){
            navigate("/signIn");
        }
    }catch(err){
        if(err.response?.data?.message=== "Enter proper detail"){
                alert("Fill your details properly");
            }else if(err.response?.data?.message=== "Something went wrong"){
                alert("Something went wrong");
            }
    }
}
    return(
        <>
            <div className="signup-page-container">
            <div className="signup-form-wrapper">
        <form onSubmit={handle} className="signup-form">
            <input type="text" placeholder="Enter your name here"  onChange={(e)=>setName(e.target.value)}/>
            <input type="email" placeholder="Enter your email here" onChange={(e)=>setGmail(e.target.value)} />
            <input type="password" placeholder="Enter your password here"  onChange={(e)=>setPassword(e.target.value)} />
            <input type="submit" />
        </form>
        <p>already have an account?<Link to="/signIn">login</Link></p>
        <p>forgot your password <Link to={'/forgotPassword'}>click here</Link></p>
        </div>
        </div>
        </>
    );
}