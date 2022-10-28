const express = require('express');

const { newPet } = require('../controllers/pets');
const router = express.Router();

router.post('/', newPet);

module.exports = router;