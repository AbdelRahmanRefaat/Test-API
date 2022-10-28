const { Pet } = require('../models/pets');

const newPet = async (req, res) => {
    const pet = new Pet(req.body);
    try {
        await pet.save();
        res.status(201).send({ message: "pet added successfuly.", pet });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

module.exports = { newPet };
