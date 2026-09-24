
// require
const { connexion } = require('../../database/database.js')
const { signToken, verifyToken } = require('../../security/jwt.js')
const { comparePassword } = require('../../security/encrypt.js')

// funtion

/**
* @description log the user in
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const login_services = async (req) => {
    let result = await connexion.query(`
        SELECT *
        FROM users 
        WHERE users.usersLogin = $1
    `,  [req.body.usersLogin])

    if (result.rows.length === 0) {
        throw new Error('INFORMATIONS_INCORRECTES')
    }

    const isPasswordCorrect = await comparePassword(req.body.usersPassword, result.rows[0]["userspassword"])

    if (isPasswordCorrect == false) {
        throw new Error('WRONG INFORMATION')
    }

    const token = signToken({ login: req.body.usersLogin, role: result.rows[0]["usersrole"] })
    
    return {
        token
    }
}

// export
module.exports = {login_services}