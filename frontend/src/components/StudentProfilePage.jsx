import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import './StudentProfilePage.css';
export default function StudentProfilePage({newUserData}){
    const [profileData,setProfileData]=useState('');

    useEffect(()=>{
        const fetch=async()=>{
            try{
    const response=await axios.get('https://event-managaement-system-backend.onrender.com/api/Student/CheckProfileExist',{withCredentials:true});
    setProfileData(response.data.data);
            }catch(err){
                console.log("profile not found",err);
            }
        };
        fetch();
    },[])
    console.log(newUserData?.rollNo);
    return(
        <>
         <div className="student-profile">
        <h1>Welcome to your profile </h1>
        <p>Name:  {profileData.userId?.name}</p>
        <p>Email: {profileData.userId?.gmail}</p>
        <p>RollNo: {profileData?.rollNo}</p>
        <p>Section: {profileData?.section}</p>
        <p>Semester: {profileData?.semester}</p>
        <p>Branch: {profileData?.branch}</p>
        </div>
        </>
    );
}