import React from "react";
import './components/auth.css'
import Login from "./components/Login";
import {Routes,Route} from 'react-router-dom'
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import OtpVerify from "./components/OtpVerify";
const App=()=>{
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/password/forgot" element={<ForgotPassword />}/>
            <Route path="/otp/verify" element={<OtpVerify />}/>
        </Routes>
    )
}
export default App;