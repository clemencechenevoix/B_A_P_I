// require
const express = require('express');
const router = express.Router();

const {showFamily, createFamily, updateFamily, deleteFamily, showLocalisation, createLocalisation, updateLocalisation, deleteLocalisation} = require('./admin.controller.js')
const {validationId, validationInformationUpdateFamily, validationInformationUpdateLocalisation, validationInformationCreateFamily, validationInformationCreateLocalisation} = require('./admin.validation.js')


// implementation of the routes logic for the admin

// show the information about all the family
router.get('/family', showFamily)

// create a new family for the flower
router.post('/family', validationInformationCreateFamily, createFamily)

// update the id family
router.put('/family/:id', validationId, validationInformationUpdateFamily, updateFamily)

// delete the family id
router.delete('/family/:id', validationId, deleteFamily)

// show the information about all the localisation
router.get('/localisation', showLocalisation)

// create a new localisation for the flower
router.post('/localisation', validationInformationCreateLocalisation, createLocalisation)

// update the id localisation
router.put('/localisation/:id', validationId, validationInformationUpdateLocalisation, updateLocalisation)

// delete the localisation id
router.delete('/localisation/:id', validationId, deleteLocalisation)

// export
module.exports = router