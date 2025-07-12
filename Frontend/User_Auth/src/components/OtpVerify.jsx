import React from "react";
import { TextField,Button } from "@mui/material";
import { Form,Formik } from "formik";
import * as Yup from 'yup'
import { MdOutlineVerified } from "react-icons/md";
import { ArrowBack } from "@mui/icons-material";
import Countdown from "react-countdown"
const OtpVerify=()=>{

    const initialState={
        otp1:'',
        otp2:'',
        otp3:'',
        otp4:'',
        otp5:'',
        otp6:'',
    }
    const validationSchema=Yup.object({
        otp1:Yup.number().required(''),
        otp2:Yup.number().required(''),
        otp3:Yup.number().required(''),
        otp4:Yup.number().required(''),
        otp5:Yup.number().required(''),
        otp6:Yup.number().required(''),
    })
    const submitHandler=(values)=>{
        console.log(values);
    }
    const otpArray=['otp1','otp2','otp3','otp4','otp5','otp6']
    const inputChange=(value,setFieldValue,index,item)=>{
          setFieldValue(item,value);
          if(index>0 && index<6){
            const element=document.getElementById(index+1);
            element.focus();
          }
    }
    return(
      <div className="auth_card">
    <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={submitHandler}>
    {({handleBlur,handleChange,values,errors,touched,setFieldValue})=><Form>
          <div className="container-fluid">
            <div className="row g-3">
                <div className="col-12 auth_header">
                    <MdOutlineVerified/>
                    <p>Verify OTP</p>
                    <span>Enter the 6-digit OTP We Just Sent To Your Registerd Email</span>
                </div>

                <div className="col-12 otp_inputs">
                    {otpArray.map((item,index)=>
                    <TextField 
                    value={values[item]}
                    onChange={(event)=>{
                        const value=event.target.value.replace(/[^0-9]/g,"")
                        inputChange(value,setFieldValue,index+1,item)
                    }}
                        inputProps={{maxLength:1,pattern:'[0-9]*'}}
                    id={index+1}
                    size="small"
                    fullWidth
                     type="text"
                     name={item[index+1]}
                     onBlur={handleBlur}
                     error={touched[item] && Boolean(errors[item])}
                    />
                    )}
                </div>
               <div className="col-12">
                <Button 
                disabled={Object.values(values).some(
                    (value)=> value === ""
                )}
                type="submit" variant="contained" fullWidth>verify</Button>
               </div>
                
                <div className="col-12">
                    <Button variant="outlined" fullWidth startIcon={<ArrowBack/>}>Back to Login</Button>
                </div>
               <Countdown 
               renderer={({minutes,seconds,completed})=>{
                 if(completed){
                    return <div style={{textAlign:"left"}}> 
                        <Button variant="text">resend</Button>
                        </div>
                 }else{
                    return (<span>
                        {minutes}:{seconds < 10 ?`0${seconds}`:seconds}
                    </span>
                    );
                 }
               }}
               date={new Date().getTime()+0.03*60*1000}/>
            </div>
          </div>
    </Form>}
    </Formik>
      </div>
    )
}

export default OtpVerify