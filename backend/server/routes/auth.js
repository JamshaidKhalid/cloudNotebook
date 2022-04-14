const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const fetchUser = require('../middleware/fetchUser');


const Signup =  require('../controller/signup');
const Signin =  require('../controller/signin');
const Getuser =  require('../controller/getuser');

/**
 Express validator is used to check the data before sending it to the database
 it is passed as 2nd argument to the post method as an array and the validation methods can be seen at documentaion
 */
//ROUTE1: creating a user        localhost/api/auth/signup,    NO AUTHENTICATION/LOGIN REQUIRED
router.post('/signup', [
    body('name').not().isEmpty().withMessage('Name is required').isLength({ min: 3 }),
    body('email').not().isEmpty().withMessage('Email is required').isEmail(),
    body('password').not().isEmpty().withMessage('Password is required').isLength({ min: 5 })
], Signup.signup);


//ROUTE2: Logging in a user    localhost/api/auth/signin,    NO AUTHENTICATION/LOGIN REQUIRED
//so finally the following post method will be used to login the user
router.post('/signin', [
    body('email').not().isEmpty().withMessage('Email is required').isEmail(),
    body('password').not().isEmpty().withMessage('Password is required')
], Signin.signin);


//ROUTE 3: getting details of logged in user    localhost/api/auth/getuser,    AUTHENTICATION/LOGIN REQUIRED
/**
 Here fetchUser is a middleware which will be used to check if the user is logged in or not
 It will provide userID and then async function will be called
 */
router.post('/getuser', fetchUser, Getuser.getuser);


module.exports = router;