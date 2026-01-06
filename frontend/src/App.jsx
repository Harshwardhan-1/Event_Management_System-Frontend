import {Routes,Route} from 'react-router-dom';
import SignUpPage from "./components/SignUpPage"
import SignInPage from './components/SignInPage';
import HomePage from './components/HomePage';
import ForgotPassword from './components/ForgotPassword';
import OtpVerify from './components/OtpVerify';
import NewPassword from './components/NewPassword';
import MakeStudentProfile from './components/MakeStudentProfile';
import StudentProfilePage from './components/StudentProfilePage';
import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';
function App() {
   useEffect(() => {
  const fetchUser=async()=>{
    try{
      const res=await axios.get(
        "https://event-managaement-system-backend.onrender.com/api/all/getUser", { withCredentials: true });
      setUserData(res.data.user);
    } catch (err) {
      console.log("User not logged in or session expired",err);
      setUserData(null);
    }
  };
  fetchUser();
}, []);
  const [userData,setUserData]=useState(null);
  const [passwordData,setPasswordData]=useState(null); 
  const [newUserData,setNewUserData]=useState(null);  
  return (
    <>
    <Routes>
      <Route path='/' element={<SignUpPage />}></Route>
      <Route path='/signIn' element={<SignInPage setUserData={setUserData} />}></Route>
      <Route path='/HomePage' element={<HomePage userData={userData}/>}></Route>
      <Route path='/ForgotPassword' element={<ForgotPassword setPasswordData={setPasswordData}/>}></Route>
      <Route path='/OtpVerify' element={<OtpVerify passwordData={passwordData} /> }></Route>
      <Route path='/NewPassword' element={<NewPassword />}></Route>
      <Route path='/MakeStudentProfile' element={<MakeStudentProfile setNewUserData={setNewUserData} />}></Route>
      <Route path='/StudentProfilePage' element={<StudentProfilePage newUserData={newUserData} />}></Route>

    </Routes>
    </>
  )
}

export default App
