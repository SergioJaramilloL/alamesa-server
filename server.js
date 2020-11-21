const express = require('express');
const cors = require('cors');
const { connect } = require('./src/db');
const clientsRouter = require('./src/routes/client');
const { auth } = require( './src/utils/auth' );
require('dotenv').config();

const port = 8080;

const app = express();
connect();

app.use(express.json());
app.use(cors());

app.use('/clients', clientsRouter);
app.get('/', auth, ( req, res ) => {
  console.log(req.client);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
