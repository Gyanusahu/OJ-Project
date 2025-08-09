const express = require('express');
const register = require('../controllers/register');
const login = require('../controllers/login');
const getUser = require('../controllers/getUser');
const logout = require('../controllers/logout');
const getAccess = require('../controllers/getAccess');
const incrementSubmission = require('../controllers/incrementSubmission');
const getLeaderboard = require('../controllers/getLeaderBoard');
const { updateAdminStatus, getAllUsers } = require('../controllers/userController');
const auth = require('../middlewares/auth');

const router = express.Router();

// Authentication & Profile
router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getUser);
router.get('/logout', logout);
router.get('/access', auth, getAccess);
router.post('/increment-submission', auth, incrementSubmission);
router.get('/leaderboard', getLeaderboard);

router.get('/users', auth, getAllUsers);            // GET all users
router.post('/users/admin', auth, updateAdminStatus); // POST to promote/demote

module.exports = router;
