const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  member1: {
    type: String,
    required: true,
  },
  sec1: {
    type: String,
    required: true,
  },
  member2: {
    type: String,
    required: false,
  },
  sec2: {
    type: String,
    required: false,
  },
  member3: {
    type: String,
    required: false,
  },
  sec3: {
    type: String,
    required: false,
  },
  member4: {
    type: String,
    required: false,
  },
  sec4: {
    type: String,
    required: false,
  },
  member5: {
    type: String,
    required: false,
  },
  sec5: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    default:null,
    },
  likes: [{ type: ObjectId, ref: "User" }],
  comments: [
    {
      text: String, //text: String is shorthand for text: {type: String}
      postedBy: { type: ObjectId, ref: "User" },
    },
  ],
  postedBy: {
    type: ObjectId,
    ref: "User", // relation building in mongodb
  },
},{timestamps:true});

mongoose.model("Post", postSchema);
