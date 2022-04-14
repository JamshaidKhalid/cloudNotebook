const express = require('express');
const connectDB = require('./server/database/connection');
const app = express();
const bodyParser = require('body-parser');

// the port variable will be set by process.env.PORT from the file config.env which is in views folder
// if it is not available there then it will be set to 8080
require("dotenv").config();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));


//conneting DB
connectDB();




app.use('/api/auth', require('./server/routes/auth'));
app.use('/api/notes', require('./server/routes/notes'));


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
