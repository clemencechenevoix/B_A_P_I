
// require
const { connexion } = require('../../database/database.js')
const {verifyToken} = require('../../security/jwt.js')

// funtion

/**
* @description update the information of the user
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const modifyProfil = async (req) => {
	const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Without Bearer
    const decoded = verifyToken(token)

    let result = await connexion.query(`
		SELECT *
		FROM users
		WHERE users.usersLogin = $1
	`, [decoded.login])

	if (result.rows.length == 0) {
		throw new Error('USERS_NOT_FOUND')
	}

	let index = 0
	let query =''

	let hasUpperCase = true
	let hasLowerCase = true
	let hasNumber = true
	let hasSpecialChar = true
	while (index < req.body.keys.length) {
		query = `
		UPDATE users 
		SET `

		if (req.body.keys[index] == "usersLogin") {
			result = await connexion.query(`
				SELECT *
				FROM users
				WHERE users.usersLogin = $1
			`, [req.body.values[index]])

			if (result.rows.length != 0) {
				throw new Error('USER_ALLREADY_EXISTE')
			}
		}
		if (req.body.keys[index] == "usersPassword") {
			hasUpperCase = /[A-Z]/.test(password);
			hasLowerCase = /[a-z]/.test(password);
			hasNumber = /[0-9]/.test(password);
			hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

			if (password.length < 12 || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
				return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères et inclure au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial." });
			}
		}
		query += req.body.keys[index]
		query += ` = $1
		WHERE users.usersLogin = $2
		`

		await connexion.query(query, [req.body.values[index], decoded.login])
		index += 1
	}

	return
}

// export
module.exports = {modifyProfil}