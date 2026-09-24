// require
const { verifyToken } = require('../jwt.js');
require('dotenv').config()

// const
const ROLE = {"admin": process.env.ADMIN_ROLE}

/**
* @description verify if the user as the require role
* * @param {string} requireRole, the role require to execute the request
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {status} and {json} a message for the status
*/
const rolesMiddleware = (requireRole) => (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Without Bearer
    const decoded = verifyToken(token)

    if (decoded.role != ROLE[requireRole]) {
        res.status(403).json({ message: "Accès refusé. Rôle insuffisant." })
        
    }

    next()
}

// export
module.exports = {rolesMiddleware}