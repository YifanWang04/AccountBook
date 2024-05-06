/**
 * 
 * @param {*} success 
 * @param {*} error 
 */
module.exports = function (success, error) {
  // Check error and set default value
  if(typeof error !== 'function'){
    error = () => {
      console.log('Connection failed');
    }
  }

  const mongoose = require('mongoose');
  //Import configuration file
  const {DBHOST, DBPORT, DBNAME} = require('../config/config.js');

  mongoose.set('strictQuery', true);

  //Connect to MongoDB service                  
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

  //Set callback for connection open
  mongoose.connection.once('open', () => {
    success();
  });

  //Set callback for connection error
  mongoose.connection.on('error', () => {
    error();
  });

  //Set callback for connection closure
  mongoose.connection.on('close', () => {
    console.log('Connection closed');
  });
}