import { Logout } from "@mui/icons-material";
import { Avatar,Button} from "@mui/material";
import React, { use } from "react";
import useGeneral from "../hooks/useGeneral";
import { useEffect } from "react";
import httpAction from "../utils/httpAction";
import apis from "../utils/apis";
import { useState } from "react";
import Headers from "./Headers/Headers";
const MyProfile=()=>{
    const [user,setUser]=useState('')
    useEffect(()=>{
       const getUser=async()=>{
        const data={
            url:apis().userProfile,
        }
        const result=await httpAction(data)
        if(result?.status){
            setUser(result?.user)
        }
       }
       getUser()
    },[])
    const {navigate}=useGeneral();
    const logoutHandler=async()=>{
        const data={
            url:apis().logout
        }
        const result=await httpAction(data)
        if(result?.status){
            navigate("/login")
        }
    }
    return(
        <>
        <Headers/>
        <div className="auth_card">
            <div className='profile_container'>
                <span className="name"><Avatar sx={{backgroundColor:'orangered',textTransform:'capitalize'}}>{user?.name?.charAt(0).toUpperCase()}</Avatar></span>
                <span className="full_name">{user?.name}</span>
                <span className="email">{user?.email}</span>
            </div>
            <div className="action">
              <Button 
              onClick={logoutHandler}
              endIcon={<Logout/>}
              variant="contained" fullWidth>logout</Button>
            </div>
        </div>
        </>
    )
}
export default MyProfile;