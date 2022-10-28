const exress = require('express');

const { registerUser } = require('../controllers/users');
const router = exress.Router();

router.post('/register', registerUser);

module.exports = router;