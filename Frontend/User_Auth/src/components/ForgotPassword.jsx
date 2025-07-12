import React from "react";
import { GrPowerReset } from "react-icons/gr";

import {TextField,Button} from "@mui/material"
import {Form,Formik} from 'formik' 
import * as Yup from 'yup'
import { ArrowBack, Send } from "@mui/icons-material";

const ForgotPassword=()=>{
    const initialState={
        email:''
    }
    const validationSchema=Yup.object({
        email:Yup.string().email('must be a valid email').required('email is required')
    })
    const submitHandler=(values)=>{
        console.log(values)
    }
    return(
        <div className="auth_card">
            <Formik initialValues={initialState} onSubmit={submitHandler} validationSchema={validationSchema}>
                {({handleBlur,handleChange,touched,values,errors})=>
                   <Form>
                    <div className="container-fluid">
                        <div className="row g-3">
                            <div className="auth_header">
                               <GrPowerReset />
                               <p>Find Your Account</p>
                               <span>Enter Your Registered Email</span>
                            </div>
                            <div className="col-12">
                                <TextField 
                                  type='email'
                                  name="email"
                                  label='Enter Your Registered Email'
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={touched.email && Boolean(errors.email)}
                                  helperText={touched.email && errors.email}
                                  fullWidth
                                  size="small"
                                />
                            </div>

                            <div className="col-12">
                                <Button type="submit" variant="contained" fullWidth endIcon={<Send />}>Send OTP</Button>
                            </div>

                             <div className="col-12">
                    <Button startIcon={<ArrowBack/>}
                    variant="outlined" fullWidth>Back To Login</Button>
                </div>

                        </div>
                    </div>
                   </Form>
                }
            </Formik>
        </div>
    )
}

export default ForgotPassword