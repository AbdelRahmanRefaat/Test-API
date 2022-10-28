const mongoose = require('mongoose');
const { petSchema } = require('./pets');
const { userSchema } = require('./users');
const { bidSchema } = require('./bids');

const auctionSchema = mongoose.Schema({
    items: {
        type: [petSchema]
    },
    registrants: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    bids: {
        type: [bidSchema]
    },
    results: {
        type: [bidSchema]
    },
    rules: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Auction = mongoose.model('Auction', auctionSchema);
module.exports = { Auction };