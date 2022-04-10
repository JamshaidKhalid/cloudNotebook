const express = require('express');
const router = express.Router();
const Users = require('../model/Users');
const { body, validationResult } = require('express-validator');


/**
 Express validator is used to check the data before sending it to the database
 it is passed as 2nd argument to the post method as an array and the validation methods can be seen at documentaion
 */
router.post('/signup', [
    body('name').not().isEmpty().withMessage('Name is required').isLength({ min: 3 }),
    body('email').not().isEmpty().withMessage('Email is required').isEmail(),
    body('password').not().isEmpty().withMessage('Password is required').isLength({ min: 5 })
], async (req, res) => {

    /**
     before creating the user instance in to be send in database,
     the following lines will check the errors produced in the 2nd argument of the post method
     if the array is not empty i.e there are erros then it will send the errors in the response
     and nothing will be send to database
     */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }


    /*
     Checking if the user already exists. findOne() is Mongo's method which will return true if the user exists
    */


    try {
        if (await (Users.findOne({ email: req.body.email }))) {
            return res.status(422).json({ errors: [{ msg: 'User already exists' }] });
        }
    
        const user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            date: req.body.date
        });
        res.send(user);
        console.log(user);
        user.save().catch(err => console.log(err));
        
    } catch (e) {
        console.log(e);
        res.status(500).send(Some error has occured);
    }



    
});



module.exports = router;