import React from "react";
import { TextField,Button,Divider } from "@mui/material";
import {Form,Formik} from 'formik'
import * as Yup from 'yup'
import { Password } from "@mui/icons-material";
import {ArrowBack, Google, Visibility,VisibilityOff} from '@mui/icons-material'
import { IoPersonAdd } from "react-icons/io5";
import useGeneral from "../hooks/useGeneral";
// import React from "react";
const Register =()=>{
     const initialState={
        name:'',
        email:'',
        password:'',
     }
     const {navigate}=useGeneral();
     const validationSchema=Yup.object({
        name:Yup.string().required('name is required'),
        email:Yup.string().email('must be a valid email').required('email is required'),
        password:Yup.string().required('password is required')
     })

     const submitHandler=(values)=>{
        console.log(values)
     }
    return(
        <div className="auth_card">
            <Formik onSubmit={submitHandler} initialValues={initialState} validationSchema={validationSchema}>
              {({handleBlur,handleChange,values,touched,errors})=><Form>
                  <div className="container-fluid">
                    <div className="row g-3">
                        <div className="col-12 auth_header">
                            <IoPersonAdd />
                            <p>create new account</p>
                            <span>sign up to continue</span>
                        </div>
                        <div className="col-12">
                            <TextField
                            name="name"
                            label="Your Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                            fullWidth
                            size="small"
                            />
                        </div>
                        <div className="col-12">
                            <TextField
                            type="email"
                            name="email"
                            label="Enter Your Email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            fullWidth
                            size="small"
                            />
                        </div>
                        <div className="col-12">
                            <TextField
                            name="password"
                            type="password"
                            label="Create new Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            fullWidth
                            size="small"
                            />
                        </div>

                        <div className="col-12">
                            <Button type="submit" variant="contained" fullWidth>Register</Button>
                        </div>
                        
                        <div className="col-12">
                    <Divider>
                        OR
                    </Divider>
                </div>

                <div className="col-12">
                   <Button variant="outlined" fullWidth endIcon={<Google/>}>Continue With Google</Button>
                </div>
                 
                <div className="col-12">
                    <Button 
                    onClick={()=>navigate('/login')}
                    startIcon={<ArrowBack/>}
                    variant="outlined" fullWidth>Back To Login</Button>
                </div>

                    </div>
                  </div>
                </Form>}
            </Formik>
        </div>
    )
}

export default Register