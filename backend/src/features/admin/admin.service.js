// require
const { connexion } = require('../../database/database.js')


// function

/**
* @description get all information of all the familys of flowers
* @param {hash} req, the request
* @return {hash} the information collected from the database 
*/
const getFamily = async () => {
	const result = await connexion.query(`
		SELECT * 
		FROM family
	`)

	return result.rows
}

/**
* @description create a new family of flowers
* @param {hash} req, the request
* @return {hash} the information collected from the database 
*/
const addFamily = async (req) => {
	let result = await connexion.query(`
		INSERT INTO family(familyName, familyDesc)
		VALUES ($1, $2)	
	`, [req.body.familyName, req.body.familyDesc])
}

/**
* @description update the family id
* @param {hash} req, the request
* @return {hash} the information collected from the database 
*/
const modifyFamily = async (req) => {
	let result = await connexion.query(`
		SELECT *
		FROM family
		WHERE family.familyId = $1
	`, [req.params.id])

	if (result.rows.length == 0) {
		throw new Error('FAMILY_NOT_FOUND')
	}

	let index = 0
	while (index < req.body.keys.length) {
		let query = `
		UPDATE family 
		SET `
		query += req.body.keys[index]
		query += ` = $1
		WHERE familyId = $2
		`

		await connexion.query(query, [req.body.values[index], req.params.id])
		index += 1
	}

	result = await connexion.query(`
		SELECT *
		FROM family
		WHERE family.familyId = $1
	`, [req.params.id])

	return result.rows
}

/**
* @description delete the family id
* @param {hash} req, the request
* @return {hash} the information collected from the database 
*/
const removeFamily = async (req) => {
	let result = await connexion.query(`
		SELECT *
		FROM family
		WHERE family.familyId = $1
	`, [req.params.id])

	if (result.rows.length == 0) {
		throw new Error('FAMILY_NOT_FOUND')
	}

	await connexion.query(`
		DELETE family                                                                                                                                                                                                                                                                                                                                                                                                                              		DELETE FROM family
		WHERE family.familyId = $1
	`, [req.params.id])
	
	return result.rows
}

/**
* @description get all information of all the localisations of the flowers
* @param {hash} req, the request
* @return {hash} the information collected from the database 
*/
const getLocalisation = async () => {
	const result = await connexion.query(`
		SELECT * 
		FROM localisation
	`)

	return result.rows
}

/**
* @description create a new localisation for the flowers
* @param {hash} req, the request
* @return {hash} the information collected from the database 
*/
const addLocalisation = async (req) => {
	const result = await connexion.query(`
		INSERT INTO localisation(localisationName)
		VALUES ($1)	
	`, [req.body.localisationName])

	return result.rows
}

/**
* @description update the localisation id
* @param {hash} req, the request
* @return {hash} the information collected from the database 
*/
const modifyLocalisation = async (req) => {
	let result = await connexion.query(`
		SELECT *
		FROM localisation
		WHERE localisation.localisationId = $1
	`, [req.params.id])

	if (result.rows.length == 0) {
		throw new Error('LOCALISATION_NOT_FOUND')
	}

	let index = 0
	while (index < req.body.keys.length) {
		let query = `
		UPDATE localisation 
		SET `
		query += req.body.keys[index]
		query += ` = $1
		WHERE localisationId = $2
		`

		await connexion.query(query, [req.body.values[index], req.params.id])
		index += 1
	}

	result = await connexion.query(`
		SELECT *
		FROM localisation
		WHERE localisation.localisationId = $1
	`, [req.params.id])

	return result.rows
}

/**
* @description delete the localisation id
* @param {hash} req, the request
* @return {hash} the information collected from the database 
*/
const removeLocalisation = async (req) => {
	let result = await connexion.query(`
		SELECT *
		FROM localisation
		WHERE localisation.localisationId = $1
	`, [req.params.id])

	if (result.rows.length == 0) {
		throw new Error('LOCALISATION_NOT_FOUND')
	}

	await connexion.query(`
		DELETE FROM localisation
		WHERE localisation.localisationId = $1
	`, [req.params.id])
	
	return result.rows
}

// export
module.exports = {getFamily, addFamily, modifyFamily, removeFamily, getLocalisation, addLocalisation, modifyLocalisation, removeLocalisation}