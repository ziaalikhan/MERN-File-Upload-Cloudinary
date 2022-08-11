
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// MongoDb connection //

const MONGO_DB_CONNECTION = async () => {
  try {
     mongoose.connect(process.env.mongodbConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Is Connected SuccessFully===>>>");
  } catch (error) {
    console.log(error);
  }
};

module.exports = MONGO_DB_CONNECTION;