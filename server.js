require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connect } = require('./src/db');
const clientsRouter = require('./src/routes/client');
const restaurantsRouter = require('./src/routes/restaurant')
const { auth } = require( './src/utils/auth');

const port = 8080;

const app = express();
connect();

app.use(express.json());
app.use(cors());

app.use('/clients', clientsRouter);
app.use('/restaurants', restaurantsRouter);

app.get('/', auth, ( req, res ) => {
  console.log(req.client);
  console.log(req.restaurant);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
