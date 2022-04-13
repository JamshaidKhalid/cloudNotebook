const jwt = require('jsonwebtoken');
const jwt_secret = 'thisismysecretforjsonwebtoken';

const fetchUser = (req, res, next) => {
    const authHeader = req.header('authtoken');

    if (!authHeader) {
        res.status(401).json({ msg: 'Not authenticated' });
    }

    try {
        const data = jwt.verify(authHeader, jwt_secret);
        req.user = data;    //this will be available in the request object
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Some error occured' });
    }    
}


module.exports = fetchUser;