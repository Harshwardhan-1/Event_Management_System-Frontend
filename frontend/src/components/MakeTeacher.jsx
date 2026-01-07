import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function MakeTeacher(){
    const navigate=useNavigate();
    const [teacherId,setTeacherId]=useState('');
    const [subject,setSubject]=useState('');
    const [department,setDepartment]=useState('');
    const [section,setSection]=useState('');
    const handle=async(e)=>{
        e.preventDefault();
        const send={teacherId,subject,department,section};
        try{
const response=await axios.post('https://event-managaement-system-backend.onrender.com/api/Teacher/checkTeacher',send,{withCredentials:true});
if(response.data.message=== 'Teacher Created Succeessfully'){
    alert('Teacher created Successfully');
    navigate('TeacherPage');
}
        }catch(err){
            if(err.response?.data?.message=== '"FIll details properly'){
                alert('Fill details properly');
            }else if(err.response?.data?.message=== 'Teacher Already Exist for same course'){
                alert('Teacher already exist for same course');
            }
        }
    }
    return(
        <>
        <h1>Welcome to Teacher Make Page</h1>
        <form onSubmit={handle}>
            <input type="text" placeholder='Enter your subject here' onChange={(e)=>setSubject(e.target.value)} />
            <input type="text" placeholder='Enter your TeacherId here' onChange={(e)=>setTeacherId(e.target.value)} />
            <input type="text" placeholder='Enter your Department here' onChange={(e)=>setDepartment(e.target.value)} />
            <input type="text" placeholder='Enter your section here' onChange={(e)=>setSection(e.target.value)} />
            <button type='submit'>Submit</button>
        </form>
        </>
    );
}