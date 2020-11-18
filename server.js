const express = require('express');
const cors = require('cors');
const { connect } = require('./src/db');
const clientsRouter = require('./src/routes/client');

const port = 8080;

const app = express();
connect();

app.use(express.json());
app.use(cors());

app.use('/clients', clientsRouter);

app.listen(port, () => console.log(`app running at http://localhost:${port}`));