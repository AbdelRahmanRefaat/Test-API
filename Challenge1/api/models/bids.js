const mongoose = require('mongoose');

const bidSchema = mongoose.Schema({
    auctionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bidAmount: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        default: "unknown"
    }
})

const Bid = mongoose.model('Bid', bidSchema);
module.exports = { Bid, bidSchema };