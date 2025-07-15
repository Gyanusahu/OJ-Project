const mongoose=require('mongoose')
// const { use } = require('passport')

const userSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    password_otp:{
        otp:{type:String},
        send_time:{type:String},
        limit:{type:Number,default:5}
    }
},{timestamps:true})
module.exports = mongoose.model('User', userSchema);