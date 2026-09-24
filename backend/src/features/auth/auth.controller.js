
// require
const {login_services} = require('./auth.service')

// funtion

/**
* @description controller of the route POST /api/auth/login , log in the admin
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const login = async (req, res) => {
    try {
        const result = await login_services(req)
        res.status(200).json({ message: "Information correctly collected", result: result })
    } catch (err) {
        if (err.message == 'INFORMATIONS_INCORRECTES') {
            res.status(409).json({ error: "Wrong information have been provied"})
        }

        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

// export
module.exports = {login}