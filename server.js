require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connect } = require('./src/db');
const clientsRouter = require('./src/routes/client');
const restaurantsRouter = require('./src/routes/restaurant')
const sanitaryRegisterRouter = require('./src/routes/sanitaryRegister');
const { auth } = require( './src/utils/auth');

const port = 8080;

const app = express();
connect();

app.use(express.json());
app.use(cors());

app.use('/clients', clientsRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/sanitary-register', sanitaryRegisterRouter);

app.get('/', auth, ( req, res ) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
