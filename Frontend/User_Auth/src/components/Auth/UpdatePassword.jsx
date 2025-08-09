import React from "react";
import { Button,TextField } from "@mui/material";
import * as Yup from 'yup'
import {Form,Formik} from 'formik'
import { ArrowBack, Password } from "@mui/icons-material";
import { GrUpdate } from "react-icons/gr";
import useGeneral from "../hooks/useGeneral";
const UpdatePassword=()=>{
    const {navigate}=useGeneral();
    const initialState={
        password:'',
    }
    const validationSchema=Yup.object({
        password:Yup.string().required('password is required')
    })
    const submitHandler=(values)=>{
        console.log(values);
        navigate('/')
    };
    return(
       <div className="auth_card">
        <Formik onSubmit={submitHandler} initialValues={initialState} validationSchema={validationSchema}>
        {({handleChange,handleBlur,values,touched,errors})=>
           <Form>
           <div className="contanier-fluid">
            <div className="row g-3">
              <div className="col-12 auth_header">
                 <GrUpdate />
                 <p>Update your password</p>
                 <span>create your new password</span>
              </div>
              <div className="col-12">
                <TextField
                type="text"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                fullWidth
                size="small"
                label='Enter new Password'
                />
              </div>
              <div className="col-12">
                <Button variant="contained" fullWidth type="submit">Update Password</Button>
              </div>

              <div className="col-12">
                    <Button 
                    onClick={()=>navigate('/login')}
                    startIcon={<ArrowBack/>}
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
export default UpdatePassword