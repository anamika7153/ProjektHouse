
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const { s3Uploadv2, s3Uploadv3 } = require("../middlewares/s3service.js");
const requireLogin = require("../middlewares/requireLogin");
const Post = mongoose.model("Post");
AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
const multer = require('multer');

const router = express.Router();

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
})

router.post(`/createpost`, requireLogin, upload.single('file'), async(req, res) => {
  console.log("req.body:: ",req.body)
      
  const { title, description, members, member1, sec1,mobile1, member2, sec2,mobile2, member3, sec3,mobile3, member4, sec4,mobile4, member5, sec5,mobile5, } = req.body;
  const { path, mimetype } = req.file;
  

  if (!title || !description) {
    return res.status(422).json({ error: "Please fill in all the fields" });
  }
  req.user.password = null;
  const post = new Post({
          title,
          description,
          members,
          member1,          
          mobile1,
          sec1,
          member2,          
          mobile2,
          sec2,
          member3,          
          mobile3,
          sec3,
          member4,          
          mobile4,
          sec4,
          member5,          
          mobile5,
          sec5,
          postedBy: req.user,
          file_path: path,
          file_mimetype: mimetype,
  })
  await post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
},
(error, req, res, next) => {
  if (error) {
    res.status(500).send(error.message);
  }
}
);


router.get("/allpost", (req, res) => {
  Post.find()
    .populate("postedBy", "_id name pic")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt") // - for descending order , createdAt for factor on whihc we need to sort
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/download/:id', async (req, res) => {
  // try {
    const file = await Post.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  // } catch (error) {
  //   res.status(400).send('Error while downloading file. Try again later.');
  // }
});

router.get("/getSubPost", requireLogin, (req, res) => {
  Post.find({ postedBy: { $in: req.user.following } })
    .populate("postedBy", "_id name pic")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/student/:id', (req,res) => {
  Post.findById(req.params.id, (error,data)=> {
    if(error){
      return next(error)
    } else {
      res.json(data)
    }
  })
})

const strg = multer.memoryStorage()

const fileFilter = (req,file, cb) => {
  // if(file.mimetype.split("/")[0] == "image") {
    if(file.mimetype.split("/")[0] == "image") {
    cb(null, true)
  }
  else {
    cb(new multer.MulterError("unexp file"), false)
  }
}

const upl = multer({
  strg,
  fileFilter,
  limits: {fileSize: 8000000, files: 2},
})

// // const newupload = multer({dest: "newuploads/"})
// // const multi = newupload.array("file")
// // const multi = newupload.fields([{name: "file1", maxCount: 1}, {name: "file2", maxCount:1}])
// // router.post("/newupload",newupload.array("file"), (req,res)=> {
// //   router.post("/newupload",upl.array("file"), async (req,res)=> {
// //     try {
// //       const ress = await s3Uploadv2(req.files)
// //       console.log("ress::",ress)
// //       res.json({status: "success"} )
// //     } catch (error) {
// //       console.log(error)
// //     }
    
// // })
router.post("/newupload",upl.array("file"), async (req,res)=> {
  try {
    console.log("req.files",req.files)
    const ress = await s3Uploadv3(req.files)
    console.log("ress::",ress)
    res.json({status: "success"} )
  } catch (error) {
    console.log(error)
  }
  
})

router.get('/downloadfile/:id', async (req, res) => {
  try {
    const fileurl = getUrlFromBucket (AWS_BUCKET_NAME, )
    // const file = await Post.findById(req.params.id);
    // res.set({
    //   'Content-Type': file.file_mimetype
    // });
    // res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

// router.get("/getfile" , async (req,res) => {
//   try {
//     function getUrlFromBucket(AWS_BUCKET_NAME,fileName){
//       const {config :{params,region}} = s3Bucket;
//       const regionString = region.includes('us-east-1') ?'':('-' + region)
//       return `https://${params.Bucket}.s3${regionString}.amazonaws.com/${fileName}`
//   };
//   } catch (error) {
//     console.log(error)
//   }
// })

router.put('/updatedata/:id', (req,res)=> {
  Post.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if(error){
      return next(error)
    } else {
      res.json(data)
    }
  })
})

router.get("/mypost", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then((myposts) => {
      res.json({ myposts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});
router.delete("/deletecomment/:postId/:commentId", requireLogin, (req, res) => {
  const { postId, commentId } = req.params;
  const tmpId = mongoose.Types.ObjectId(commentId);
  Post.findByIdAndUpdate(
    postId,
    {
      $pull: { comments: { _id: tmpId } },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.get("/post/:id", (req, res) => {
  Post.findOne({_id: req.params.id})
    .populate("postedBy", "_id name pic")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt") // - for descending order , createdAt for factor on whihc we need to sort
    .then((post) => {
      res.json({ post });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/editpost/:id", async (req,res) => {
  // try {
    // const postt  = await Post.findOne({_id: req.params._id})
    await Post.findOne({_id: req.params._id})
    .populate("postedBy", "_id name pic")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt") // - for descending order , createdAt for factor on whihc we need to sort
    .then((postt) => {
      res.json({ postt });
      console.log("req.params.id:" ,req.params._id)
      console.log("postt",postt)
    })
    .catch((err) => {
      console.log(err);
    });
} )

router.delete("/deletepost/:postId", requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() == req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

module.exports = router;

