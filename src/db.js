const mongoose = require('mongoose');

function connect() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.once('open', () =>
    console.log('connection established sucessfully')
  );
  mongoose.connection.on('error', (err) =>
    console.log('something went wrong', err)
  );
  return mongoose.connection;
}

module.exports = { connect }