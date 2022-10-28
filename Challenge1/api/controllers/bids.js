
const { Bid } = require('../models/bids');
const { Auction } = require('../models/auctions');
const mongoose = require('mongoose');
const placeBid = async (req, res) => {
    const bid = new Bid(req.body);

    const auctionId = req.params.auctionId;
    console.log(`AuctionId = ${auctionId}`);
    bid.auctionId = auctionId;
    try {
        const auction = await Auction.findById(auctionId);
        await bid.save();
        auction.bids.push(bid);
        auction.save();
        res.status(201).send({ message: "Bid placed successfuly.", bid });
    } catch (err) {
        res.status(404).send({ error: err.message });
    }
}

const showBids = async (req, res) => {
    const auctionId = req.params.auctionId;
    if (auctionId === null)
        res.status(404).send({ error: "Invalid auction id." });
    else {
        try {
            const auction = await Auction.findById(auctionId);
            res.status(200).send(auction.bids);
        } catch (err) {
            res.status(504).send({ error: 'Auction Not Found.' });
        }
    }
}

module.exports = { placeBid, showBids };