const mongoose = require("mongoose");

const postUser = mongoose.Schema(
  {
    name: {
      type: String,
    },
    userName: {
      type: String,
    },
    image: {
      public_Id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const influencerPost = mongoose.model("users", postUser);

module.exports = influencerPost;
