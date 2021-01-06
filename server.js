require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connect } = require('./src/db');
const clientsRouter = require('./src/routes/client');
const restaurantsRouter = require('./src/routes/restaurant');
const reservationsRouter = require('./src/routes/reservation');
const sanitaryRegisterRouter = require('./src/routes/sanitaryRegister');
const companionsRouter = require('./src/routes/companion');
const menuRouter = require('./src/routes/menu');

const port = process.env.PORT || 8000;

const app = express();
connect();

app.use(express.json());
app.use(cors());

app.use('/clients', clientsRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/reservations', reservationsRouter);
app.use('/sanitary-register', sanitaryRegisterRouter);
app.use('/companions', companionsRouter);
app.use('/menu', menuRouter);


app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
