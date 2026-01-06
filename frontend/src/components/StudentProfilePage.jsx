import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';
export default function StudentProfilePage({newUserData}){
    const [profileData,setProfileData]=useState('');

    useEffect(()=>{
        const fetch=async()=>{
            try{
    const response=await axios.get('https://event-managaement-system-backend.onrender.com/api/Student/CheckStudent',{withCredentials:true});
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
        <h1>Welcome to your profile </h1>
        <p>{profileData?.rollNo}</p>
        <p>{profileData?.section}</p>
        <p>{profileData?.semester}</p>
        <p>{profileData?.branch}</p>
        </>
    );
}