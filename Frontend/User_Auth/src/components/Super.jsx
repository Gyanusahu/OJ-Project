import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate,Outlet } from "react-router-dom";
import apis from "../utils/apis";
import httpAction from "../utils/httpAction";
const Super=()=>{
    const [loading,setLoading]=useState(true)
    const [isAuth,setIsAuth]=useState(false)
    useEffect(()=>{
       const getUserAccess=async()=>{
        const data={
            url:apis().getAccess
        }
        setLoading(true)
        const result = await httpAction(data);
    
setLoading(false);
if (result?.status) {
   setIsAuth(true);
} else {
   setIsAuth(false); // force redirect fallback
}
       }
       getUserAccess()
    },[])
    if(loading){
        return <p>loading..</p>
    }
    if(!isAuth){
        return <Navigate to='/login'/>
    }else{
        return <Outlet/>
    }

}
export default Super