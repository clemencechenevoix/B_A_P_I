// require
const {getFamily, addFamily, modifyFamily, removeFamily, getLocalisation, addLocalisation, modifyLocalisation, removeLocalisation} = require('./admin.service.js')

// function

/**
* @description controller of the route GET /api/admin/family/ , list all the familys of flower
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const showFamily = async (req, res) => {
    try {
        const result = await getFamily()
        res.status(200).json({ message: "Information correctly collected", result: result })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}


/**
* @description controller of the route POST /api/admin/family/ , create a new family of flowers
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const 
createFamily = async (req, res) => {
    try {
        await addFamily(req)
        res.status(200).json({ message: "Family correctly created"})
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

/**
* @description controller of the route PUT /api/admin/family/:id , update the family id
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const updateFamily = async (req, res) => {
    try {
        const result = await modifyFamily(req)
        res.status(200).json({ message: "Family correctly updated", result: result })
    } catch (err) {
        if (err.message === 'FAMILY_NOT_FOUND') {
		    res.status(404).json({ error: "Family id not found"})
	    }
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

/**
* @description controller of the route DELETE /api/admin/family/:id , delete the family id
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const deleteFamily = async (req, res) => {
    try {
        const result = await removeFamily(req)
        res.status(200).json({ message: "Family correctly deleted", result: result })
    } catch (err) {
        if (err.message === 'FAMILY_NOT_FOUND') {
		    res.status(404).json({ error: "Family id not found"})
	    }
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

/**
* @description controller of the route GET /api/admin/localisation/ , list all the localisations of the flowers
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const showLocalisation = async (req, res) => {
    try {
        const result = await getLocalisation()
        res.status(200).json({ message: "Information correctly collected", result: result })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}


/**
* @description controller of the route POST /api/admin/localisation/ , create a new localisation for the flowers
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const createLocalisation = async (req, res) => {
    try {
        await addLocalisation(req)
        res.status(200).json({ message: "Localisation correctly created"})
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

/**
* @description controller of the route PUT /api/admin/localisation/:id , update the localisation id
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const updateLocalisation = async (req, res) => {
    try {
        const result = await modifyLocalisation(req)
        res.status(200).json({ message: "Localisation correctly updated", result: result })
    } catch (err) {
        if (err.message === 'LOCALISATION_NOT_FOUND') {
		    res.status(404).json({ error: "Localisation id not found"})
	    }
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

/**
* @description controller of the route DELETE /api/admin/localisation/:id , delete the localisation id
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const deleteLocalisation = async (req, res) => {
    try {
        const result = await removeLocalisation(req)
        res.status(200).json({ message: "Localisation correctly deleted", result: result })
    } catch (err) {
        if (err.message === 'LOCALISATION_NOT_FOUND') {
		    res.status(404).json({ error: "Localisation id not found"})
	    }
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

// export
module.exports = {showFamily, createFamily, updateFamily, deleteFamily, showLocalisation, createLocalisation, updateLocalisation, deleteLocalisation}