const express = require("express");
const postsController = require("../controllers/postsController");
const tokenController = require("../controllers/tokenController");
const router = express.Router();

router.post(
  "/:id",
  tokenController.verify,
  postsController.getAllLikesByPostId
);
router.post("/:id/:like", tokenController.verify, postsController.likePost);

module.exports = router;
