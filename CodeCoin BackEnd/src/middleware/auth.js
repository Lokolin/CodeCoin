const jwt = require("jsonwebtoken");
const jwtSecret = "life is good";

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) {
        res.status(401).json({message: 'Token not provided!'});
    }

    const token = authHeader.toString();
    try {
        jwt.verify(token, jwtSecret);
    } catch (e) {
        if(e instanceof jwt.JsonWebTokenError) {
            res.status(401).json({message: 'Invalid token!'});
        }
    }
    next();
}