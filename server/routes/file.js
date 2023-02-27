require('dotenv').config();

const path = require('path');
const express = require('express');
var cloudinary = require('cloudinary').v2;

const mongoose = require("mongoose");
const requireLogin = require('../middlewares/requireLogin');

const File = mongoose.model("File");


const multer = require('multer');
const Router = express.Router();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 8000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls|ppt|pptx)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls, ppt, pptx format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

Router.post(
  '/upload',
  upload.single('file'),
  requireLogin,
   async(req, res) => {
    try {
      // let uploadedfile = UploadApiResponse;
    // const resultt = await cloudinary.v2.uploader.upload(file, options).then(callback);
    // const resultt = await cloudinary.uploader.upload(req.file.path, {
    //   public_id: `${Date.now()}`,
    //   folder: "files",
    //   resource_type: "auto",
    // })
    
      const { title, description, member1, sec1,members, member2, sec2, member3, sec3, member4, sec4, member5, sec5 } = req.body;
      const { path, mimetype } = req.file;
      // const { secure_url, bytes, format } = req.resultt;
      // console.log("req.resultt: ",req.resultt);
      // console.log("resultt",resultt)
      // console.log("resultt.secure_url: ",resultt.secure_url)
      // console.log("req.body: ",req.body);
      const file = new File({
        title,
        description,
        members,
        member1,
        sec1,
        member2,
        sec2,
        member3,
        sec3,
        member4,
        sec4,
        member5,
        sec5,
        postedBy: req.user,
        file_path: path,
        file_mimetype: mimetype,
        // secure_url,
        // format
        });
        // console.log(file)
      //  file.save()
      await file.save()
      // .then((result)=> {
      //   res.json({file:result})
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
      // console.log("req.user: ", req.user)
      // console.log("postedby: ", postedBy)
      res.send('file uploaded successfully.');
    } catch (error) {
      // res.status(400).send('Error while uploading file. Try again later.');
      res.status(400).send(error);
      console.log(error)
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.get('/team/:id', (req,res) => {
  File.findOne({_id: req.params.id})
  .populate("postedBy", "_id name pic")
  .populate("comments.postedBy", "_id name")
  .sort("-createdAt") // - for descending order , createdAt for factor on whihc we need to sort
  .then((file) => {
    res.send(file)
  })
  .catch((err) => {
    console.log(err);
  });
})

Router.get('/getAllTeams', async (req, res) => {
  const files = await File.find()
  .populate("postedBy", "_id name pic")
  .populate("comments.postedBy", "_id name")
  .sort("-createdAt") // - for descending order , createdAt for factor on whihc we need to sort
  .then((files) => {
    // res.send({ files });
        res.send(files)
        // console.log(files)
        // console.log({files})
  })
  .catch((err) => {
    console.log(err);
  });


  // try {
  //   const files =  File.find()
  //   .populate("postedBy", "_id name")
  //   .then((files) => {
  //     res.json({files})
  //     res.send({files})
  //     res.send(files)
        // console.log(files)
        // console.log({files})
  //   })
  // } catch (error) {
  //   res.status(400).send('Error while getting list of files. Try again later.');
  // }

  // try {
  //   const files = await File.find({})
  //   const sortedByCreationDate = files.sort(
  //     (a, b) => b.createdAt - a.createdAt
  //   );
  //   // .populate("postedBy", "_id name pic")
  //   // .sort("-createdAt")
  //   // .then(files => {
  //   //   res.send(files)
  //   // })
  //   res.send(files);
  // } catch (error) {
  //   res.status(400).send('Error while getting list of files. Try again later.');
  // }
});

Router.put("/commentt", requireLogin, async(req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  // console.log("comment",comment)
   File.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
      // useFindAndModify: false
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        return res.status(201).json(result);
      }
    });
});

Router.get('/downloadfiles/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
      /* setting the content-type is very important to get the file in the correct format as we're not just uploading images but also doc, xls and pdf files. So to correctly send back the file content, the content-type is required. */
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

module.exports = Router;
