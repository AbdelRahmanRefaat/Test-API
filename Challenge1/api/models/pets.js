const mongoose = require('mongoose');

const petSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
});

const Pet = mongoose.model('Pet', petSchema);
module.exports = { Pet, petSchema };