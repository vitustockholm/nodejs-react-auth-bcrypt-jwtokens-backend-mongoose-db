const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGOO_DB_URI);
    console.log('Mongo DB Connected.');

    return true;
  } catch (error) {
    console.log(`Mongo DB NOTConnected. ${error.message}`);

    process.exit(1); // stops connection at mongodb service
  }
};

module.exports = connectDB;
