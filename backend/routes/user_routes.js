const express = require('express');
const {loginUser, signupUser, getUsers, addFriend} = require('../controllers/user_controller')
const router = express.Router();

//find users
router.get('/',getUsers)
//user sign up
router.post('/signup',signupUser)
//user login 
router.post('/login', loginUser)
//user sign out
// router.delete('/signout', signoutUser)
router.post('/:user_id/friends/:friend_id',addFriend)
module.exports = router
