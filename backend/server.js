const express = require('express');
const connectDB = require('./server/database/connection');
const app = express();

// the port variable will be set by process.env.PORT from the file config.env which is in views folder
// if it is not available there then it will be set to 8080
require("dotenv").config();
const PORT = process.env.PORT || 8080;



connectDB();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});