import { useState} from "react";
import { useEffect } from "react";
import axios from "axios";
export default function TeacherPage(){
    const [data,setData]=useState([]);
    useEffect(()=>{
        const fetch=async()=>{
            try{
        const response=await axios.get('https://event-managaement-system-backend.onrender.com/api/Teacher/',{withCredentials:true});
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
    return(
        <>
        <h1>This Is Teacher Page</h1>
        {data.map((all,index)=>(
            <div key={index}>
                <p>{all?.name}</p>
                <p>{all?.gmail}</p>
                <p>{all?.teacherId}</p>
                <p>{all?.subject}</p>
                <p>{all?.department}</p>
                <p>{all?.section}</p>
            </div>
        ))}
        </>
    );
}