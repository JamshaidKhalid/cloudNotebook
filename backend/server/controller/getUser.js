const Users = require('../model/Users');

exports.getuser = async (req, res) => {
    try {
        //req.id is provided by fetchuser and we are using req.user.id to get userID and then simple
        const userId = req.user.id;     
        const user = await Users.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }

}