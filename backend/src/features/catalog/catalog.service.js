// require
const { connexion } = require('../../database/database.js')

// function

/**
* @description get the information of all the flower
* @param {hash} req, the request
* @return {hash} the information collected from the database 
*/
const getFlower = async (req) => {
    let query = `
        SELECT flower.flowerId, flower.flowerPicture , flower.flowerName
	    FROM flower
        JOIN localisation ON flower.localisationId = localisation.localisationId
        JOIN family ON flower.familyId = family.familyId 
    `
    let param = []
    let paramIndex = 1

    const limit = 20
    const offset = req.body.page * limit

    if(req.body.search != null) {
        query += `
            WHERE flower.flowerName ILIKE $${paramIndex}
            OR localisation.localisationName ILIKE $${paramIndex}
            OR family.familyName ILIKE $${paramIndex} 
        `
        paramIndex += 1
        param.push(`%${req.body.search.trim()}%`)
    }

    query += `
        ORDER BY flower.flowerName ASC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
    param.push(limit, offset)
    const result = await connexion.query(query, param)
   	
    return {
        "result": result.rows,
        "page": req.body.page
    }
}

/**
* @description get the information of the flower productId
* @param {hash} req, the request
* @return {hash} the information collected from the database 
*/
const getFlowerId = async (req) => {
	const result = await connexion.query(`
       		SELECT *
       	 	FROM flower
       	 	JOIN localisation ON flower.localisationId = localisation.localisationId
        	JOIN family ON flower.familyId = family.familyId
		    WHERE flowerId = $1
    	`, [req.params.id])
    
    if (result.rows.length == 0) {
        throw Error('FLOWER_NOT_FOUND')
    }

    return result.rows
}

/**
* @description create a new flower
* @param {hash} req, the request
* @return {hash} the information of the created flower
*/
const addFlower = async (req) => {
	const familyId = await connexion.query(`
		SELECT familyId
		FROM family
		WHERE family.familyName ILIKE $1
	`, [`%${req.body.familyName.trim()}%`])

	if (familyId.rows.length == 0) {
		throw new Error('FAMILY_NOT_FOUND')
	}
	
	const localisationId = await connexion.query(`
		SELECT localisationId
		FROM localisation
		WHERE localisation.localisationName ILIKE $1
	`, [`%${req.body.localisationName.trim()}%`])

	if (localisationId.rows.length == 0) {
		throw new Error('LOCALISATION_NOT_FOUND')
	}

    await connexion.query(`
       		INSERT INTO flower(flowerPicture, flowerName, familyId , localisationId)
       	 	VALUES ($1, $2, $3, $4)
    	`, [req.body.flowerPicture, req.body.flowerName, familyId.rows[0]["familyid"], localisationId.rows[0]["localisationid"]])
}

/**
* @description update the information of the flower id
* @param {hash} req, the request
* @return {hash} the information of the updated flower
*/
const modifyFlower = async (req) => {
	let result = await connexion.query(`
		SELECT *
		FROM flower
		WHERE flower.flowerId = $1
	`, [req.params.id])

	if (result.rows.length == 0) {
		throw new Error('FLOWER_NOT_FOUND')
	}

	let index = 0
    let familyId = 0
    let param = []
    let query= ``
	while (index < req.body.keys.length) {
		query = `
		UPDATE flower 
		SET `
        param = []

        if (req.body.keys[index] == "familyName") {
            familyId = await connexion.query(`
                SELECT familyId
		        FROM family
		        WHERE family.familyName ILIKE $1
	        `, [`%${req.body.values[index].trim()}%`])

            if (familyId.rows.length == 0) {
		        throw new Error('FAMILY_NOT_FOUND')
	        }

            query += "familyId"
            param.push(familyId.rows[0]["familyid"])

        } else if (req.body.keys[index] == "localisationName") {
            localisationId = await connexion.query(`
                SELECT localisationId
		        FROM localisation
		        WHERE localisation.localisationName ILIKE $1
	        `, [`%${req.body.values[index].trim()}%`])

            if (localisationId.rows.length == 0) {
		        throw new Error('LOCALISATION_NOT_FOUND')
	        }

            query += "localisationId"
            param.push(localisationId.rows[0]["localisationid"])
        } else {
            query += req.body.keys[index]
            param.push(req.body.values[index])
        }
		
		query += ` = $1
		    WHERE flowerId = $2
		`
        param.push(req.params.id)

		await connexion.query(query, param)
		index += 1
	}

	result = await connexion.query(`
		SELECT *
		FROM flower
		WHERE flower.flowerId = $1
	`, [req.params.id])

	return result.rows
}

/**
* @description delete the flower id
* @param {hash} req, the request
* @return {hash} the information of the deleted flower
*/
const removeFlower = async (req) => {
	let result = await connexion.query(`
		SELECT *
		FROM flower
		WHERE flower.flowerId = $1
	`, [req.params.id])

	if (result.rows.length == 0) {
		throw new Error('FLOWER_NOT_FOUND')
	}

	await connexion.query(`
		DELETE FROM flower
		WHERE flower.flowerId = $1
	`, [req.params.id])

	return result.rows

}

// export
module.exports = {getFlower, getFlowerId, addFlower, modifyFlower, removeFlower}