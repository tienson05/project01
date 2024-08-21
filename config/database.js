const mongoose = require('mongoose');

module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE);
    console.log('Connect Success');
  } catch (error) {
    console.log('Connect Error');
  }
}
