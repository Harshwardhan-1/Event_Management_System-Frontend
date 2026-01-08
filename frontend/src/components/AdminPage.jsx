import { useState } from "react";
import {useEffect} from 'react';
import axios from 'axios';
import './AdminPage.css';
export default function AdminPage(){
    const [data,setData]=useState([]);
        const fetch=async()=>{
            try{
    const response=await axios.get('https://event-managaement-system-backend.onrender.com/api/all/allUser',{withCredentials:true});
    setData(response.data.allUser);
            }catch(err){
                console.log(err);
            }
        };
        useEffect(()=>{
        fetch();
        },[])
    const handleDelete=async(gmail)=>{
        const send={gmail};
        try{
const response=await axios.post('https://event-managaement-system-backend.onrender.com/api/all/handleUpdate',send,{withCredentials:true});
if(response.data.message=== 'Role upadted to Teacher'){
    alert('role updated');
}
        }catch(err){
            if(err.response?.data?.message=== 'Provide Gmail'){
                alert('provide gmail');
            }else if(err.response?.data?.message=== 'user not exist in database'){
                alert('user not exist');
            }
        }
    }
    const handleAdmin=async(gmail)=>{
        const send={gmail};
        try{
const response=await axios.post("https://event-managaement-system-backend.onrender.com/api/all/MakeAdmin",send,{withCredentials:true});
            if(response.data.message=== 'Make Admin'){
                alert('Make him admin');
            }
        }catch(err){
            if(err.response?.data?.message=== 'gmail not found'){
                alert('gmail is necessary');
            }else if(err.response?.data?.message=== 'gmail not found in database'){
                alert('gmail not found in database');
            }
        }
    }
    const handleEveryone=async(gmail)=>{
        const send={gmail};
        try{
            const response=await axios.post('https://event-managaement-system-backend.onrender.com/api/all/DeleteAnyone',send,{withCredentials:true});
            if(response.data.message=== 'user deleted successfully'){
                alert('delete successfully');
                fetch();
            }
        }catch(err){
            if(err.response?.data?.message=== 'provide gmail'){
                alert('provide gmail');
            }else if(err.response?.data?.message=== 'user not found'){
                alert('user not found');
            }
        }
    }
    return(
        <>
         <div className="admin-page">
        <h1>I am the admin Harshwardhan Yadav</h1>
        {data.map((all,index)=>(
            <div  className="admin-card"  key={index}>
                <p>{all.name}</p>
                <p>{all.gmail}</p>
                <p>{all.role}</p>
                <button onClick={()=>handleDelete(all.gmail)}>Make Teacher</button>
                <button onClick={()=>handleAdmin(all.gmail)}>Make Admin</button>
                <button>Add Student</button>
                <button>Update Student</button>
                <button>Delete Teacher</button>
                <button onClick={()=>handleEveryone(all.gmail)}>Delete Anyone</button>
            </div>
            ))}
            </div>
        </>
    );
}