import React, { useState } from "react";
 import { IoIosLogIn } from "react-icons/io";
import {TextField,Button, FormControl, InputAdornment, IconButton, Divider} from '@mui/material'
import * as Yup from 'yup';
import {Form,Formik} from "formik";
import {ArrowBack, Google, Visibility,VisibilityOff} from '@mui/icons-material'
import useGeneral from "../hooks/useGeneral";
const Login=()=>{
    // validation to check Every details Is Enter or Not
    const [visible,setVisible]=useState(false)
    const {navigate}=useGeneral()
    const visibleHandler=()=>{
        setVisible(!visible)
    }
    const initialState={
        email:'',
        password:'',

    }
    const validationSchema=Yup.object({
        email:Yup.string().email('invalid email').required('email is required'),
        password:Yup.string().required('password is required')
    })

    const submitHandler=(values)=>{
        console.log(values)
    }


    // validation Ends

    const loginWithGoogle=()=>{
        window.location.href='http://localhost:5050/auth/google'
    }
    return(
      <div className="auth_card">
        <Formik onSubmit={submitHandler} validationSchema={validationSchema} initialValues={initialState}>
            {({handleBlur,handleChange,values,touched,errors})=><Form>
                <div className="container-fluid">
            <div className="row g-3">
                {/* //header */}
                <div className="col-12 auth_header">
                  <IoIosLogIn/>
                  <p>Welcome back</p>
                  <span>Login to continue</span>
                </div>
               {/* //form */}
                <div className="col-12">
                    <TextField
                    name="email"
                    onChange={handleChange} onBlur={handleBlur}
                     error={touched.email && Boolean(errors.email)}
                     helperText={touched.email && errors.email}
                    label='Enter your email' fullWidth 
                    size="small" />
                </div>

                <div className="col-12">
                    <TextField 
//                    InputProps={{
//   endAdornment: (
//     <InputAdornment position="end">
//       <IconButton onClick={visibleHandler} edge="end">
//         {visible ? <Visibility /> : <VisibilityOff />}
//       </IconButton>
//     </InputAdornment>
//   ),
// }}

                    type='password'
                    name="password"
                    label='your password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password &&Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    fullWidth
                    size="small"
                    />
                </div>

                <div className="col-12">
                    <Button variant="contained" fullWidth type="submit">
                        login
                    </Button>
                </div>
                 
                <div className="col-12">
                    <Divider>
                        OR
                    </Divider>
                </div>

                <div className="col-12">
                   <Button 
                   onClick={loginWithGoogle}
                   variant="outlined" fullWidth endIcon={<Google/>}>Google</Button>
                </div>

                <div className="col-12">
                    <Button 
                    onClick={()=>navigate('/register')}
                    startIcon={<ArrowBack/>}
                    variant="outlined" fullWidth>create new account</Button>
                </div>
                <div className="col-12">
                    <Button 
                    onClick={()=>navigate('/password/forgot')}
                    fullWidth variant="text" color="error">
                        forgotten password?
                    </Button>
                </div>
            </div>
        </div>
                </Form>}
        </Formik>
        </div>
    )
}
export default Login