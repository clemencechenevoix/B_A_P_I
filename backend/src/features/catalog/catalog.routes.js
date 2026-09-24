// require
const express = require('express');
const router = express.Router();

const { showFlower, showFlowerId, createFlower, updateFlower, deleteFlower} = require('./catalog.controller')
const { validationId, validationPage, validationInformationUpdateFLower, validationInformationCreateFlower } = require('./catalog.validation')

const {authMiddleware} = require("../../security/middleware/auth.middleware")
const {rolesMiddleware} = require("../../security/middleware/roles.middleware")

// implementation of the routes logic for the catalog

// show the information of the flower for the catalog
router.get('/', validationPage, showFlower)

// create a flower for the catalog (only usable for the Admin)
router.post('/items', authMiddleware, rolesMiddleware('admin'), validationInformationCreateFlower, createFlower)

// show more information about the id flower of the catalog
router.get('/items/:id', validationId, showFlowerId)

// update the information of the id flower of the catalog (only usable for the Admin)
router.put('/items/:id', authMiddleware, rolesMiddleware('admin'), validationId, validationInformationUpdateFLower, updateFlower)

// dalete the id flower of the catalog (only usable for the Admin)
router.delete('/items/:id', authMiddleware, rolesMiddleware('admin'), validationId, deleteFlower)

// export
module.exports = router