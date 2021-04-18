const express = require("express");
const commentsController = require("../controllers/commentsController");
const tokenController = require("../controllers/tokenController");
const router = express.Router();
const multer = require("../utils/multer");
const multiparty = require("multiparty");

// router.get('/',tokenController.verify, commentsController.getAllComments)
router.get(
  "/:id",
  tokenController.verify,
  commentsController.getAllCommentsById
);
// //router.get('/count/:id',tokenController.verify, commentsController.getCountCommentsByPostId)
// router.get('/post/:id',tokenController.verify, commentsController.getCommentById)
router.post("/", tokenController.verify, commentsController.addComment);
// //router.put('/:id', tokenController.verify, commentsController.editComment)
router.delete("/:id", tokenController.verify, commentsController.deleteComment);
// router.post('/:id/like',tokenController.verify, multer, commentsController.likeComment)

module.exports = router;
