import { Logout } from "@mui/icons-material";
import { Avatar,Button} from "@mui/material";
import React, { use } from "react";
import useGeneral from "../hooks/useGeneral";
const Profile=()=>{
    const {navigate}=useGeneral();
    return(
        <div className="auth_card">
            <div className='profile_container'>
                <span className="name"><Avatar sx={{backgroundColor:'orangered',textTransform:'capitalize'}}>a</Avatar></span>
                <span className="full_name">name</span>
                <span className="email">email@email.com</span>
            </div>
            <div className="action">
              <Button 
              onClick={()=>navigate('/login')}
              endIcon={<Logout/>}
              variant="contained" fullWidth>logout</Button>
            </div>
        </div>
    )
}
export default Profile;