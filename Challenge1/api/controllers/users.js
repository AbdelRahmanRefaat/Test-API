const { User } = require('../models/users');

const registerUser = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send({ message: "user registered successfuly.", user });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

module.exports = { registerUser };
