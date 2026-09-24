// require
const express = require('express');
const router = express.Router();

const {showFamily, createFamily, updateFamily, deleteFamily, showLocalisation, createLocalisation, updateLocalisation, deleteLocalisation} = require('./admin.controller.js')
const {validationId, validationInformationUpdateFamily, validationInformationUpdateLocalisation, validationInformationCreateFamily, validationInformationCreateLocalisation} = require('./admin.validation.js')

const {authMiddleware} = require("../../security/middleware/auth.middleware")
const {rolesMiddleware} = require("../../security/middleware/roles.middleware")


// implementation of the routes logic for the admin

// show the information about all the family
router.get('/family', authMiddleware, rolesMiddleware('admin'), showFamily)

// create a new family for the flower
router.post('/family', authMiddleware, rolesMiddleware('admin'), validationInformationCreateFamily, createFamily)

// update the id family
router.put('/family/:id', authMiddleware, rolesMiddleware('admin'), validationId, validationInformationUpdateFamily, updateFamily)

// delete the family id
router.delete('/family/:id', authMiddleware, rolesMiddleware('admin'), validationId, deleteFamily)

// show the information about all the localisation
router.get('/localisation', authMiddleware, rolesMiddleware('admin'), showLocalisation)

// create a new localisation for the flower
router.post('/localisation', authMiddleware, rolesMiddleware('admin'), validationInformationCreateLocalisation, createLocalisation)

// update the id localisation
router.put('/localisation/:id', authMiddleware, rolesMiddleware('admin'), validationId, validationInformationUpdateLocalisation, updateLocalisation)

// delete the localisation id
router.delete('/localisation/:id', authMiddleware, rolesMiddleware('admin'), validationId, deleteLocalisation)

// export
module.exports = router