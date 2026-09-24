// require
const express = require('express');
const router = express.Router();

const {login} = require('./auth.controller')
const {validationLogin} = require('./auth.validation')

// implementation of the routes logic for the authentification

// login to an account
router.post('/login', validationLogin, login)

// export
module.exports = router