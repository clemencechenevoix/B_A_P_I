// function

/**
* @description Check if the information given in order to log in are valid
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the information is not valid
*/
const validationLogin = (req, res, next) => {
    if (req.body.usersPassword == null || req.body.usersLogin == null) {
		return res.status(400).json({error: "usersPassword and usersLogin need to be specify"})
	}

	if (isNaN(parseInt(req.body.usersPassword)) == false || isNaN(parseInt(req.body.usersLogin)) == false) {
		return res.status(400).json({error: "usersPassword and usersLogin need to be string"})
	}
	req.params.id = parseInt(req.params.id)
	next()
}

// exports
module.exports = {validationLogin}