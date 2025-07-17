import React from "react";
import './components/auth.css'
import Login from "./components/Login";
import {Routes,Route} from 'react-router-dom'
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import OtpVerify from "./components/OtpVerify";
import UpdatePassword from "./components/UpdatePassword";
import Profile from "./components/profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Super from "./components/Super";
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
            <Route path="/" element={<Profile/>}/>
            </Route>
        </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}
export default App;