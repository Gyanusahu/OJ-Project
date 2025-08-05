const express=require('express')
const register=require('../controllers/register')
const login=require('../controllers/login')
const router=express.Router()
const getUser=require('../controllers/getUser')
const auth=require('../middlewares/auth')
const logout=require('../controllers/logout')
const getAccess=require('../controllers/getAccess')
const incrementSubmission = require('../controllers/incrementSubmission');
const getLeaderboard = require('../controllers/getLeaderBoard');
router.post('/register',register);
router.post('/login',login)
router.get('/profile',auth,getUser)
router.get('/logout',logout)
router.get('/access',auth,getAccess)
router.post('/increment-submission', auth, incrementSubmission);
router.get('/leaderboard', getLeaderboard);
module.exports=router