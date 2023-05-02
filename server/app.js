//server.js

require('dotenv').config();
const express = require("express");
// const bodyParser = require("body-parser");
const cors = require('cors');
require('./db/db');
const path = require("path")
const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

require("./models/user");
require("./models/post");
require("./models/file");
require("./models/otp");

app.use(express.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, '..', 'build')));

app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));
app.use(require("./routes/file"));

// app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
