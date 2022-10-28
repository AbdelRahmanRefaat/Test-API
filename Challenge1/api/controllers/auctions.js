const { Auction } = require('../models/auctions');

const createAuction = async (req, res) => {
    const auction = new Auction(req.body);
    try {
        await auction.save();
        res.status(201).send({ message: "auction created successfuly.", auction });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

module.exports = { createAuction }; 