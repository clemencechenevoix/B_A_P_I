// require
const { verifyToken } = require('../jwt.js');

//function

/**
* @description verify if the user is connected
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {status} and {json} a message for the status
*/
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Without Bearer

    if (token == false) {
        return res.status(401).json({ message: "Token d'authentification manquant."});
    }
    
    try {
        verifyToken(token);
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token d'authentification invalide ou expiré." });
    }
}

// exports
module.exports = {authMiddleware}