// require
const bcrypt = require('bcrypt')

// function

/**
* @description delete the flower id
* @param {string} password, password given
* @return {hash} the information of the deleted flower
*/
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

/**
* @description compare a given password
* @param {string} plainPassword, password given to compare with the hashPassword
* @param {hash} hashPassword, encoded password in with bcrypt
* @return {promise} resolved with the comparison result salt or rejected with an Error
*/
const comparePassword = async (plainPassword, hashPassword) => {
    return await bcrypt.compare(plainPassword, hashPassword)
}

// exports
module.exports = { hashPassword, comparePassword }