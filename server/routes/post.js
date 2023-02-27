const express = require("express");
const mongoose = require("mongoose");
const path = require('path');

const requireLogin = require("../middlewares/requireLogin");
const Post = mongoose.model("Post");

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
});

router.post("/createpost", requireLogin, upload.single('file'), async(req, res) => {
  console.log("req.body:: ",req.body)
      
  const { title, description, members, member1, sec1, member2, sec2, member3, sec3, member4, sec4, member5, sec5, } = req.body;
  const { path, mimetype } = req.file;
      // console.log("req.body: ",req.body);
      console.log("req.file: ",req.file);
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


// router.post("/createpost", requireLogin, async(req, res) => {
//   console.log("req.body:: ",req.body)
      
//   const { title, description, photo, members, member1, sec1, member2, sec2, member3, sec3, member4, sec4, member5, sec5, } = req.body;
 
//   if (!title || !description) {
//     return res.status(422).json({ error: "Please fill in all the fields" });
//   }
//   req.user.password = null;
//   var post;
//   if (photo) {
//     post = new Post({
//       title,
//       description,
//       photo,
//       members,
//       member1,
//       sec1,
//       member2,
//       sec2,
//       member3,
//       sec3,
//       member4,
//       sec4,
//       member5,
//       sec5,
//       postedBy: req.user,
//       file_path: path,
//       file_mimetype: mimetype,
//     });
//   } else {
//     post = new Post({
//       title,
//       description,
//       members,
//       member1,
//       sec1,
//       member2,
//       sec2,
//       member3,
//       sec3,
//       member4,
//       sec4,
//       member5,
//       sec5,
//       postedBy: req.user,
//       file_path: path,
//       file_mimetype: mimetype,
//     });
//   }
//   await post
//     .save()
//     .then((result) => {
//       res.json({ post: result });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });


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
    // console.log("download file", file)
    res.set({
      'Content-Type': file.file_mimetype
    });
    // console.log("beforee")
    // console.log("file.file_path",file.file_path)
    res.sendFile(path.join(__dirname, '..', file.file_path));
    // console.log("downnnnnnnnnnnnnnnnnnnnnnnn")
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
    // .then((postt) => {
      // res.json(postt)
      // console.log("req.params.id:" ,req.params._id)
      // console.log("postt",postt)
    // })
    // res.json(postt)
  // } catch (error) {
  //   console.log(error)
  // }
} )

// router.put("/editpost/:id", requireLogin, (req, res) => {
//   User.findByIdAndUpdate(
//     req.user._id,
//     req.body,
//     { $set: { pic: req.body.pic } },
//     { new: true },
//     (err, result) => {
//       if (err) {
//         return res.status(422).json({ error: "Pic can not be updated" });
//       }
//       res.json(result);
//     }
//   );
// });


// router.put("/post/:id", (req, res) => {
//   // const post = posts.find((post)=> post.id === req.params.id);
//   Post.findOne({_id: req.params.id})
//   .populate("postedBy", "_id")
//     .exec((err, post) => {
//       if (err || !post) {
//         return res.status(422).json({ error: err });
//       }
//       if (post._id.toString() == req.user._id.toString()) {
//         post.title = req.body.title
//   post.description = req.body.description
//   post.member1 = req.body.member1
//   post.sec1 = req.body.sec1
//   post.member2 = req.body.member2
//   post.sec2 = req.body.sec2
//   post.member3 = req.body.member3
//   post.sec3 = req.body.sec3
//   post.member4 = req.body.member4
//   post.sec4 = req.body.sec4
//   post.member5 = req.body.member5
//   post.sec5 = req.body.sec5
//   res.send("Updated successfully")
//       }
//     });
 
  // Post.findOne({_id: req.params.id})
  //   .populate("postedBy", "_id name pic")
  //   .populate("comments.postedBy", "_id name")
  //   .sort("-createdAt") // - for descending order , createdAt for factor on whihc we need to sort
  //   .then((post) => {
  //     res.json({ post });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
// });

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










// const express = require("express");
// const path = require('path');
// const mongoose = require("mongoose");
// const multer = require('multer');
// const File = require('../models/post');


// const requireLogin = require("../middlewares/requireLogin");
// const Post = mongoose.model("Post");

// const router = express.Router();

// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, cb) {
//       cb(null, './files');
//     },
//     filename(req, file, cb) {
//       cb(null, `${new Date().getTime()}_${file.originalname}`);
//     }
//   }),
//   limits: {
//     fileSize: 8000000 // max file size 1MB = 1000000 bytes
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls|ppt|pptx)$/)) {
//       return cb(
//         new Error(
//           'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls, ppt, pptx format.'
//         )
//       );
//     }
//     cb(undefined, true); // continue with upload
//   }
// });

// router.post("/createpost", requireLogin, (req, res) => {
//   const { title, description, } = req.body;
//   const { path, mimetype } = req.file;
//   if (!title || !description) {
//     return res.status(422).json({ error: "Please fill in all the fields" });
//   }
//   req.user.password = null;
//   var post;
//   if (photo) {
//     post = new Post({
//       title,
//       description,
//       photo,
//       // member1,
//       // member2,
//       // member3,
//       // member4,
//       // member5,
//       // file_path: path,
//       // file_mimetype: mimetype,
//       postedBy: req.user,
//     });
//   } else {
//     post = new Post({
//       title,
//       description,
//       // member1,
//       // member2,
//       // member3,
//       // member4,
//       // member5,
//       // file_path: path,
//       // file_mimetype: mimetype,
//       postedBy: req.user,
//     });
//   }
//   post
//     .save()
//     .then((result) => {
//       res.json({ post: result });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// router.get("/allpost", (req, res) => {
//   Post.find()
//     .populate("postedBy", "_id name pic")
//     .populate("comments.postedBy", "_id name")
//     .sort("-createdAt") // - for descending order , createdAt for factor on whihc we need to sort
//     .then((posts) => {
//       res.json({ posts });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// router.get("/getSubPost", requireLogin, (req, res) => {
//   Post.find({ postedBy: { $in: req.user.following } })
//     .populate("postedBy", "_id name pic")
//     .populate("comments.postedBy", "_id name")
//     .sort("-createdAt")
//     .then((posts) => {
//       res.json({ posts });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// router.get("/mypost", requireLogin, (req, res) => {
//   Post.find({ postedBy: req.user._id })
//     .populate("postedBy", "_id name")
//     .populate("comments.postedBy", "_id name")
//     .sort("-createdAt")
//     .then((myposts) => {
//       res.json({ myposts });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// router.put("/like", requireLogin, (req, res) => {
//   Post.findByIdAndUpdate(
//     req.body.postId,
//     {
//       $push: { likes: req.user._id },
//     },
//     {
//       new: true,
//     }
//   )
//     .populate("postedBy", "_id name")
//     .exec((err, result) => {
//       if (err) {
//         return res.status(422).json({ error: err });
//       } else {
//         res.json(result);
//       }
//     });
// });

// router.put("/unlike", requireLogin, (req, res) => {
//   Post.findByIdAndUpdate(
//     req.body.postId,
//     {
//       $pull: { likes: req.user._id },
//     },
//     {
//       new: true,
//     }
//   )
//     .populate("postedBy", "_id name")
//     .exec((err, result) => {
//       if (err) {
//         return res.status(422).json({ error: err });
//       } else {
//         res.json(result);
//       }
//     });
// });

// router.put("/comment", requireLogin, (req, res) => {
//   const comment = {
//     text: req.body.text,
//     postedBy: req.user._id,
//   };
//   Post.findByIdAndUpdate(
//     req.body.postId,
//     {
//       $push: { comments: comment },
//     },
//     {
//       new: true,
//     }
//   )
//     .populate("comments.postedBy", "_id name")
//     .populate("postedBy", "_id name")
//     .exec((err, result) => {
//       if (err) {
//         return res.status(422).json({ error: err });
//       } else {
//         res.json(result);
//       }
//     });
// });
// router.delete("/deletecomment/:postId/:commentId", requireLogin, (req, res) => {
//   const { postId, commentId } = req.params;
//   const tmpId = mongoose.Types.ObjectId(commentId);
//   Post.findByIdAndUpdate(
//     postId,
//     {
//       $pull: { comments: { _id: tmpId } },
//     },
//     {
//       new: true,
//     }
//   )
//     .populate("comments.postedBy", "_id name")
//     .populate("postedBy", "_id name")
//     .exec((err, result) => {
//       if (err) {
//         return res.status(422).json({ error: err });
//       } else {
//         res.json(result);
//       }
//     });
// });
// router.delete("/deletepost/:postId", requireLogin, (req, res) => {
//   Post.findOne({ _id: req.params.postId })
//     .populate("postedBy", "_id")
//     .exec((err, post) => {
//       if (err || !post) {
//         return res.status(422).json({ error: err });
//       }
//       if (post.postedBy._id.toString() == req.user._id.toString()) {
//         post
//           .remove()
//           .then((result) => {
//             res.json(result);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }
//     });
// });

// module.exports = router;
