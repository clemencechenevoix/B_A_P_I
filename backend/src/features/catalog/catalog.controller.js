// require
const {getFlower, getFlowerId, addFlower, modifyFlower, removeFlower} = require('./catalog.service.js')

// function

/**
* @description controller of the route GET /api/catalog/ , list all the flower
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const showFlower = async (req, res) => {
    try {
        const result = await getFlower(req)
        res.status(200).json({ message: "Information correctly collected", result: result })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}


/**
* @description controller of the route GET /api/catalog/items/:id , list the information of the flower id
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const showFlowerId = async (req, res) => {
    try {
        const result = await getFlowerId(req)
        res.status(200).json({ message: "Information correctly collected", result: result })
    } catch (err) {
        if (err.message === 'FLOWER_NOT_FOUND') {
            res.status(404).json({ error: "Flower id not found"})
        }

        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

/**
* @description controller of the route POST /api/catalog/items , create a new flower in the database
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information of the new flower if there is no error 
*/
const createFlower = async (req, res) => {
    try {
        const result = await addFlower(req)
        res.status(200).json({ message: "Flower correctly created", result: result })
    } catch (err) {
        if (err.message === 'FAMILY_NOT_FOUND') {
            res.status(404).json({ error: "Given family not found"})
        }
        if (err.message === 'LOCALISATION_NOT_FOUND') {
            res.status(404).json({ error: "Given localisation not found"})
        }
	
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

/**
* @description controller of the route PUT /api/catalog/items/:id , update the information of the flower id
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information of the updated flower if there is no error 
*/
const updateFlower = async (req, res) => {
    try {
        const result = await modifyFlower(req)
        res.status(200).json({ message: "Flower correctly updated", result: result })
    } catch (err) {
        if (err.message === 'FLOWER_NOT_FOUND') {
            res.status(404).json({ error: "Flower id not found"})
        }
        if (err.message === 'LOCALISATION_NOT_FOUND') {
            res.status(404).json({ error: "Localisation id not found"})
        }
        if (err.message === 'FAMILY_NOT_FOUND') {
            res.status(404).json({ error: "Family id not found"})
        }
	
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

/**
* @description controller of the route DELETE /api/catalog/items/:id , delete the flower id
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information of deleted flower if there is no error 
*/
const deleteFlower = async (req, res) => {
    try {
        const result = await removeFlower(req)
        res.status(200).json({ message: "Flower correctly deleted", result: result })
    } catch (err) {
	if (err.message === 'FLOWER_NOT_FOUND') {
		res.status(404).json({ error: "Flower id not found"})
	}

        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

// export
module.exports = {showFlower, showFlowerId, createFlower, updateFlower, deleteFlower}