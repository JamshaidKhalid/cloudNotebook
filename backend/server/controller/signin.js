const Users = require('../model/Users');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwt_secret = 'thisismysecretforjsonwebtoken';
exports.signin = async (req, res) => {

    /**
     before accessing the database to compare credentials,
     the following lines will check the errors produced in the 2nd argument of the post method
     if the array is not empty i.e there are erros then it will send the errors in the response
     and nothing will be send to database
     */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    //getting email and password from body entered by the user
    const { email, password } = req.body;


    try {
        //checking if the user exists in database or not
        let user = await Users.findOne({ email });
        if (!user) {
            return res.status(422).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        // comparing the password entered by the user with the hashed password in database
        // bcrypt.compare() is a method which will return true if the password entered by the user is same as the hashed password in database
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(422).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }


        //finally if the user exists and the password is correct then we will send a session/token/jwt token to the user
        const data = {
            id: user.id
        }

        //this token will be sent to the user and will be used to authenticate the user
        //jwt.sign() is taking userData which is in this case ID of user generated by mongoDB and a secret password
        const authToken = jwt.sign(data, jwt_secret);

        res.send({ authToken });

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");

    }

}