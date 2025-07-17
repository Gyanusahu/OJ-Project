const express=require('express')
const register=require('../controllers/register')
const login=require('../controllers/login')
const router=express.Router()
const getUser=require('../controllers/getUser')
const auth=require('../middlewares/auth')
const logout=require('../controllers/logout')
const getAccess=require('../controllers/getAccess')
router.post('/register',register);
router.post('/login',login)
router.get('/profile',auth,getUser)
router.get('/logout',logout)
router.get('/access',auth,getAccess)
module.exports=router