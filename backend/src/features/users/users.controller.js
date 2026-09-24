
// require
const {modifyProfil} = require('./users.service')

// funtion

/**
* @description controller of the route PUT /api/users/profil , update the information of the admin
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const updateProfil = async (req, res) => {
    try {
        const result = await modifyProfil(req)
        res.status(200).json({ message: "Information modifyed correctly", result: result })
    } catch (err) {
        if (err.message == 'USERS_NOT_FOUND') {
            res.status(409).json({ error: "The users was not found"})
        }
        if (err.message == 'USER_ALLREADY_EXISTE') {
            res.status(409).json({ error: "This Login is allready used by another user"})
        }

        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

// export
module.exports = {updateProfil}