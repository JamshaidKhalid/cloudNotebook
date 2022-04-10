const express = require('express');
const router = express.Router();
// const Users = require('../model/Users');


router.post('/', (req, res) => {
    // const user = new Users({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    //     date: req.body.date
    // });
    res.send(req.body);
    console.log("Hello world");
    // user.save()
});



module.exports = router;