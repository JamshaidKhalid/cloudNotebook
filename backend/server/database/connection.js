const mongoose = require('mongoose');
const MONGO_URI=`mongodb+srv://admin:admin123@cluster0.tvcmj.mongodb.net/cloudNotebook?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

};

module.exports = connectDB;


//the mongoDB was created in the account jamshaidkhalid32@gmail.com
//the password is admin123 and username is admin