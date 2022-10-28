const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors');

const bidsRouter = require('./api/routes/bids');
const usersRouter = require('./api/routes/users');
const petsRouter = require('./api/routes/pets');
const auctionsRouter = require('./api/routes/auctions');
const { default: mongoose } = require('mongoose');

const PORT = 3000;
const DB_CONNECTION_URL = 'mongodb+srv://camlist:yFbMbd1eAcibK41E@cluster0.7dfis8q.mongodb.net/?retryWrites=true&w=majority';
const app = express();

app.use(bodyparser.json({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());


app.use('/bids', bidsRouter);
app.use('/user', usersRouter);
app.use('/pets', petsRouter);
app.use('/auctions', auctionsRouter);

mongoose.connect(DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    }))
    .catch((err) => console.log({ error: err.message }));
