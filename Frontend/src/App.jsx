import React from "react";
import './components/Auth/auth.css'
import Login from "./components//Auth/Login.jsx";
import {Routes,Route} from 'react-router-dom'
import Register from "./components//Auth/Register.jsx";
import  { useState, useEffect } from 'react';

// import ForgotPassword from "./components/ForgotPassword";
// import OtpVerify from "./components/OtpVerify";
// import UpdatePassword from "./components/UpdatePassword";
// import MyProfile from "./components/profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Super from "./components/Auth/Super.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Headers from "./components/Headers/Headers";
import Home from "./pages/Home/Hero.jsx";
// Change This
import AddProblem from "./pages/AddProblem/AddProblem";  
import Edit from "./pages/Edit/Edit";
import Profile from "./pages/Profile/Profile";
import ProblemList from "./pages/ProblemList/ProblemList";
import ProblemDetail from "./pages/ProblemDetail/ProblemDetail";
import UserDashboard from "./pages/UserDashboard/userDashboard";
import Leaderboard from "./pages/LeaderBoard/Leaderboard";
import AdminPanel from "./pages/UserController/AdminPanel.jsx";
import AdminRoute from "./components/ProtectedRoutes/AdminRoute.jsx";
import PreviousSubmissions from "./pages/Submission/MySubmissions.jsx";
import axios from 'axios';
import Loader from "./components/Loader/loader.jsx";
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // NEW

  useEffect(() => {
    axios
      .get('https://backend.coderush.space/api/user/profile', { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false)); // Mark as loaded even if error
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<ProblemList />} />
        <Route path="/problems/:id" element={<ProblemDetail />} />

        <Route element={<Super />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          {/* <Route path="/my-submissions" element={<PreviousSubmissions />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/userprofile/:id" element={<Profile />} />

          <Route
            path="/addproblems"
            element={
              <AdminRoute>
                <AddProblem />
              </AdminRoute>
            }
          />
          <Route
            path="/usercontroller"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;