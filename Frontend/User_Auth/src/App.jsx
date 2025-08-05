import React from "react";
import './components/auth.css'
import Login from "./components/Login";
import {Routes,Route} from 'react-router-dom'
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import OtpVerify from "./components/OtpVerify";
import UpdatePassword from "./components/UpdatePassword";
import MyProfile from "./components/profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Super from "./components/Super";
import 'bootstrap/dist/css/bootstrap.min.css';
import Headers from "./components/Headers/Headers";
import Home from "./pages/Home/Home";
// Change This
import AddProblem from "./pages/AddProblem/AddProblem";  
import Edit from "./pages/Edit/Edit";
import Profile from "./pages/Profile/Profile";
import ProblemList from "./pages/ProblemList/ProblemList";
import ProblemDetail from "./pages/ProblemDetail/ProblemDetail";
import UserDashboard from "./pages/UserDashboard/userDashboard";
import Leaderboard from "./pages/LeaderBoard/Leaderboard";
const App=()=>{
    return (
        <>
       
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/password/forgot" element={<ForgotPassword />}/>
            <Route path="/otp/verify" element={<OtpVerify />}/>
            <Route path="/password/update" element={<UpdatePassword />}/>
           
            <Route element={<Super/>}>
            <Route path="/dashboard" element={<UserDashboard/>}/>
            <Route path="/leaderboard" element={<Leaderboard/>} />
            <Route path="/" element={<MyProfile/>}/>
             <Route path="/problems" element={<ProblemList />} />
            <Route path="/home" element={<Home/>}/>
           <Route path='/addproblems' element={<AddProblem/>}/>
           <Route path='/edit/:id' element={<Edit/>}/>
           <Route path="/userprofile/:id" element={<Profile/>}/>
           <Route path="/problems/:id" element={<ProblemDetail />} />
            </Route>
        </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}
export default App;