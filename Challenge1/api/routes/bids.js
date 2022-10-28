const express = require('express');
const { placeBid, showBids } = require('../controllers/bids');

const router = express.Router();

router.post('/placebid/:auctionId', placeBid);
router.get('/:auctionId', showBids);

module.exports = router;
