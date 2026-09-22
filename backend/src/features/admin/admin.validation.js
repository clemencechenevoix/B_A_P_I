// const

const HASH_FAMILY = {"familyName": 50, "familyDesc": 500}
const HASH_LOCALISATION = {"localisationName": 50}
const HASH_NOT_NULL = {"familyName": "ok", "localisationName": "ok"}

// function

/**
* @description Check if the id given is a number
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validationId = (req, res, next) => {
	if (isNaN(parseInt(req.params.id))) {
		return res.status(400).json({error: "id need to be a number"})
	}
	req.params.id = parseInt(req.params.id)
	next()
}

/**
* @description Check if the given keys to update are valid
* @param {hash} req, the request
* @return nothing or {Error} an error if the key to update is not valid
*/
const verifyKeys = (req, hashUpdate) => {
	if (req.body.keys == null || req.body.keys.length == 0) {
		throw new Error('MISSING_INFORMATION')
    }
    	
	let index = 0
	while (index < req.body.keys.length) {
		if (hashUpdate[req.body.keys[index]] == null) {
       			throw new Error('NO_PERMISSION')
   		}
		index += 1
	}
}

/**
* @description Check if the given values for the keys to update are valid
* @param {hash} req, the request
* @return nothing or {Error} an error if the key to update is not valid
*/
const verifyValues = (req, hashUpdate) => {
	if (req.body.values == null || req.body.values.length != req.body.keys.length || req.body.values.length == 0) {
		throw new Error('MISSING_INFORMATION')
    }

	let index = 0
	while (index < req.body.values.length) {
		if (!isNaN(parseInt(req.body.values[index]))) {
       			throw new Error('NUMBER_GIVEN')
   		}

		if (HASH_NOT_NULL[req.body.keys[index]] == "ok" && req.body.values[index].length == 0 ) {
        		throw new Error('MISSING_INFORMATION')
    	}
		if (req.body.values[index].length > hashUpdate[req.body.keys[index]]) {
        		throw new Error('TOO_MANY_CHARACTER')
    	}
		index += 1
	}
}


/**
* @description Check if the informations given to update the localisation are valid
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the information are not valid
*/
const validationInformationUpdateLocalisation = (req, res, next) => {
	try {
		let hashUpdate = HASH_LOCALISATION
        verifyKeys(req, hashUpdate)
        verifyValues(req, hashUpdate)

		next()

    } catch (error) {
        if (error.message == 'NUMBER_GIVEN') {
            return res.status(400).json({ error: "The value for this key need to be a string" });
        }
        if (error.message == 'MISSING_INFORMATION') {
            return res.status(400).json({ error: "The value for the variables key and value need to be entered " });
        }
        if (error.message == 'NO_PERMISSION') {
            return res.status(423).json({ error: "Permission denied" });
        }
        if (error.message == 'TOO_MANY_CHARACTER') {
            return res.status(400).json({ error: "There with too many character" });
        }
        console.log(error.message)  
    }
}

/**
* @description Check if the informations given to update the family are valid
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the information are not valid
*/
const validationInformationUpdateFamily = (req, res, next) => {
	try {
		let hashUpdate = HASH_FAMILY
        verifyKeys(req, hashUpdate)
        verifyValues(req, hashUpdate)

		next()

    } catch (error) {
        if (error.message == 'NUMBER_GIVEN') {
            return res.status(400).json({ error: "The value for this key need to be a string" });
        }
        if (error.message == 'MISSING_INFORMATION') {
            return res.status(400).json({ error: "The value for the variables key and value need to be entered " });
        }
        if (error.message == 'NO_PERMISSION') {
            return res.status(423).json({ error: "Permission denied" });
        }
        if (error.message == 'TOO_MANY_CHARACTER') {
            return res.status(400).json({ error: "There with too many character" });
        }
        console.log(error.message)  
    }
}

/**
* @description Check if the informations given to created a new family are valid
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the information is not valid
*/
const validationInformationCreateFamily = (req, res, next) => {
    if (req.body.familyName == null || req.body.familyName.length == 0) {
		return res.status(400).json({ error: "The value for the variables familyName need to be entered " });
	}
	
	if (req.body.familyName.length > HASH_FAMILY["familyName"]) {
		return res.status(400).json({ error: "Too many character for one of the value " });
	}
	
	if (req.body.familyDesc != null && req.body.familyDesc.length > HASH_FAMILY["familyDesc"]) {
		return res.status(400).json({ error: "Too many character for one of the value " });	
	}

	next()
}

/**
* @description Check if the informations given to created a new localisation are valid
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the information is not valid
*/
const validationInformationCreateLocalisation = (req, res, next) => {
    if (req.body.localisationName == null || req.body.localisationName.length == 0) {
		return res.status(400).json({ error: "The value for the variables localisationName need to be entered " });
	}
	
	if (req.body.localisationName.length > HASH_LOCALISATION["localisationName"]) {
		return res.status(400).json({ error: "Too many character for one of the value " });
	}

	next()
}	

// export
module.exports = {validationId, validationInformationUpdateFamily, validationInformationUpdateLocalisation, validationInformationCreateFamily, validationInformationCreateLocalisation}