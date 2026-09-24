// require
const express = require('express');
const router = express.Router();

const {updateProfil} = require("./users.controller")
const {validationInformationUpdateUsers} = require("./users.validation")

const {authMiddleware} = require("../../security/middleware/auth.middleware")
const {rolesMiddleware} = require("../../security/middleware/roles.middleware")

// implementation of the routes logic for the authentification

// update the admin information
router.put('/profil', authMiddleware, validationInformationUpdateUsers, updateProfil)

// export
module.exports = router