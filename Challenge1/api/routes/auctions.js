const express = require('express');

const { createAuction } = require('../controllers/auctions');
const router = express.Router();

router.post('/newauction', createAuction);

module.exports = router;