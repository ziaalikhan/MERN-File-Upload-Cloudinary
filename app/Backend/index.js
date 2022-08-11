const express = require("express");
const app = express();
const MONGO_DB_CONNECTION = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser");
// const router = require("./router/apiRoutes");
const PORT = process.env.PORT || 5000;
var cloudinary = require("cloudinary").v2;
const influencerPost = require("./model/UserSchema");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});
// MongoDb connection //
MONGO_DB_CONNECTION();
// parse application/json
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());
// app.use("/", router);

app.post("/image", async (req, res) => {
  const { name, userName, image } = req.body;
  try {
    const postImage = await cloudinary.uploader.upload(image, {
      folder: "/profiles",
    });
    // console.log("ImageUrl==>", ImageUrl);
    const postData = await new influencerPost({
      name: name,
      userName: userName,
      image: {
        public_Id: postImage.public_id,
        url: postImage.secure_url,
      },
    }).save();
    await res.send({ msg: "Uploaded SuccessFully!", postData });
  } catch (error) {
    res.status(400).send({ msg: "Image is Not Uploaded!" });
  }
});

app.get("/images", async (req, res) => {
  const getImages = await influencerPost.find({});
  res.send({ msg: "Successfully Fetched!", getImages });
});

app.listen(PORT, () => {
  console.log(`Your Server is started at ${PORT}`);
});
