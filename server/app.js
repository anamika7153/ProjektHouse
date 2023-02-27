//server.js
require('dotenv').config();
const express = require("express");
// const bodyParser = require("body-parser");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const path = require('path');
const cors = require('cors');
require('./db/db');

const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

require("./models/user");
require("./models/post");
require("./models/file");
// const fileRoute = require('./routes/file');

// require("./models/register");

// const teams = require("./models/register")

app.use(express.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, '..', 'build')));

app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));
app.use(require("./routes/file"));
// app.use(fileRoute);
// app.use(require("./routes/team"));

app.use(express.urlencoded({extended:true}))
// app.use(bodyParser.urlencoded({extended:true}))

// var storage = multer.diskStorage({
//   destination: function(req,res,cb) {
//     cb(null, "uploaded")
//   },
//   filename: function(req,file,cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));

//   }
// })
// var upload = multer({
//   storage: storage 
// })

// app.post('/uploadfile', upload.single('myFile'), (req,res,next) => {
//   const file = req.file;

//   if(!file) {
//     const error = new Error("Please upload a file");
//     error.httpStatusCode = 400;
//     return next(error);
//   }
//   res.send(file);
// })

// //multiple files route
// app.post('/uploadmultiple', upload.array('myFiles', 12), (req,res,next) => {
//   const files = req.files;

//   if(!files) {
//     const error = new Error("Please upload files");
//     error.httpStatusCode = 400;
//     return next(error);
//   }
//   res.send(files);
// })

// //multiple images to db
// app.post("/uploadphoto", upload.single('myImage'), (req,res) => {
//   var img = fs.readFileSync(req.file.path);

//   var encode_image = img.toString('base64');
//   var finalImg = {
//     contentType:req.file.mimetype,
//     path:req.file.path,
//     image:new Buffer(encode_image,'base64')
//   };
//   //insert it to db
  
// })


// if (process.env.NODE_ENV == "production") {
//   //for heroku deployment
//   app.use(express.static("client/build"));
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
// ,
//     "heroku-postbuild":"NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
