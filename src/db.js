const mongoose = require('mongoose');

function connect(){
  mongoose.connect('mongodb://localhost:27017/alamesa', {
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