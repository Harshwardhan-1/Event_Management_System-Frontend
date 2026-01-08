import { useState} from "react";
import { useEffect } from "react";
import axios from "axios";
import './TeacherPage.css';
export default function TeacherPage(){
    const [data,setData]=useState([]);
    const [student,setStudent]=useState([]);
    const [showAttendence,setShowAttendence]=useState([]);
    useEffect(()=>{
        const fetch=async()=>{
            try{
        const response=await axios.get('https://event-managaement-system-backend.onrender.com/api/Teacher/getTeacher',{withCredentials:true});
        if(response.data.message=== 'ProfileFind'){
            setData(response.data.data);
        }
            }catch(err){
                if(err.response?.data?.message=== 'Teacher Not Found'){
                    alert('please enter correct Detail');
                }
            }
        };
        fetch();
    },[]);
    

    const handleStudents=async(department,section)=>{
        const send={department,section};
        try{
        const response=await axios.post('https://event-managaement-system-backend.onrender.com/api/Student/getParticularStudent',send,{withCredentials:true});
        if(response.data.message=== 'Got ALL Student'){
            setStudent(response.data.data);
        }
        }catch(err){
            if(err.response?.data?.message=== 'no student found'){
                alert('No Student Found');
            }else if(err.response?.data?.message=== 'provide department and section and gmail'){
                alert('provide proper detail');
            }
        }
    }
    const handlePresent=async(name,gmail,section)=>{
        const send={name,gmail,section};
        try{
    const response=await axios.post('https://event-managaement-system-backend.onrender.com/api/TeacherAttendence/markAttendence',send,{withCredentials:true});
    if(response.data.message=== 'student attendence successfully marked present'){
        alert('attendence marked successfully');
    }
}catch(err){
    if(err.response?.data?.message=== 'provide detail properly'){
        alert('fill detail properly');
    }else if(err.response?.data?.message=== 'student attendence mark already for today subject'){
        alert('student attendence for this subject and for this date already marked previously');
    }
}
    }

    const handleDelete=async(name,gmail,section)=>{
        const send={name,gmail,section};
        try{
const response=await axios.post('https://event-managaement-system-backend.onrender.com/api/TeacherAttendence/markAbsent',send,{withCredentials:true});
if(response.data.message=== 'attendence mark successfully'){
    alert('attendence mark successfully');
}
        }catch(err){
            if(err.response?.data?.message=== 'provide full detail'){
                alert('provide full detail');
            }else if(err.response?.data?.message=== 'user attendence already has been marked'){
                alert('attendence for this subject for this student already marked');
            }
        }
    }


    const handleAttendence=async(name,gmail)=>{
        const send={name,gmail};
        try{
const response=await axios.post('https://event-managaement-system-backend.onrender.com/api/TeacherAttendence/getAttendence',send,{withCredentials:true});
if(response.data.message=== 'getStudentAttendence');
setShowAttendence(response.data.data);
        }catch(err){
            if(err.response?.data?.message=== 'provide detail'){
                alert('provide proper detail');
            }else if(err.response?.data?.message=== 'no record'){
                alert('no record found');
            }else if(err.response?.data?.message=== 'not find student'){
                alert('no student found');
            }
        }
    }
    return(
        <>
          <div className="teacher-page">
        <h1>This Is Teacher Page</h1>
        <div className="teacher-card">
                <p><span>Name:</span>{data?.name}</p>
                <p><span>Email:</span>{data?.gmail}</p>
                <p><span>Teacher ID</span>{data?.teacherId}</p>
                <p><span>Subject:</span>{data?.subject}</p>
                <p><span>Department:</span>{data?.department}</p>
                <p><span>Section:</span>{data?.section}</p>
    <button onClick={()=>handleStudents(data?.department,data?.section)}>Show All Students of this class</button>
                </div>   
    
 <div className="students-container">
                {student.map((all,index)=>(
                    <div className="student-card" key={index}>
                        <p>{all?.userId?.name}</p>
                        <p>{all?.userId?.gmail}</p>
                        <p>{all?.rollNo}</p>
                        <p>{all?.branch}</p>
                        <p>{all?.section}</p>
                        <p>{all?.semester}</p>
<button onClick={()=>handlePresent(all?.userId?.name,all?.userId?.gmail,all?.section)}>Present</button>
<button onClick={()=>handleDelete(all?.userId?.name,all?.userId.gmail,all?.section)}>Absent</button>
<button onClick={()=>handleAttendence(all?.userId?.name,all?.userId.gmail)}>Show All Attendence</button>
                    </div>
                ))}
                </div>
                </div>

                {showAttendence.map((all,index)=>(
                    <div key={index}>
                        <strong>{index+1}</strong>
                        <p>Name:{all.name}</p>
                        <p>Date: {new Date(all.date).toLocaleDateString()}, </p> 
                        <p>Status:{all.attendence}</p>
                    </div>
                ))}
        </>
    );
}