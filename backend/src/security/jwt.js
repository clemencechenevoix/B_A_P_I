// require
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Function

/**
* @description create a signed token
* @param {hash} payload, information in the token
* @return {token} the created and signed token
*/
const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })
}

/**
* @description create a signed token
* @param {token} payload, information in the token
* @return {hash} the decoded token
*/
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

// exports
module.exports = { signToken, verifyToken }