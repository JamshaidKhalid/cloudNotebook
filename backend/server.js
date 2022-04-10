const express = require('express');
const connectDB = require('./server/database/connection');
const Users = require('./server/model/Users');
const app = express();
const bodyParser = require('body-parser');

// the port variable will be set by process.env.PORT from the file config.env which is in views folder
// if it is not available there then it will be set to 8080
require("dotenv").config();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));


connectDB();

app.post('/', (req, res) => {
    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    res.send(user);
    console.log(user);
    user.save()
});


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});