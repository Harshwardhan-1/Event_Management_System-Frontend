import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
export default function MakeStudentProfile({setNewUserData}){
    const [rollNo,setRollNo]=useState('');
    const [branch,setBranch]=useState('');
    const [section,setSection]=useState('');
    const [semester,setSemester]=useState('');
    const [phone,setPhone]=useState('');
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const send={rollNo,branch,section,semester,phone};
        try{
const response=await axios.post('https://event-managaement-system-backend.onrender.com/api/Student/CheckStudent',send,{withCredentials:true});
if(response.data.message=== 'Student data saved'){
    setNewUserData(response.data.data);
    navigate('/StudentProfilePage');
}
        }catch(err){
            if(err.response?.data?.message=== 'Enter detail properly'){
                alert('fill complete details');
            }else if(err.response?.data?.message=== 'Profile already Exist'){
                alert('Profile already Exist');
            }
        }
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
<input type="text" placeholder="Enter your rollNo here" name="rollNo" onChange={(e)=>setRollNo(e.target.value)} />
<input type="text" placeholder="Enter your branch here" name="branch" onChange={(e)=>setBranch(e.target.value)} />
<input type="text" placeholder="Enter your section here" name="section" onChange={(e)=>setSection(e.target.value)} />
<input type="text" placeholder="Enter your semester here" name="semester" onChange={(e)=>setSemester(e.target.value)} />
<input type="number"  placeholder="Enter your phoneNo here" name="phone" onChange={(e)=>setPhone(e.target.value)}/>
<input type="submit" />
       </form>
        </>
    );
}