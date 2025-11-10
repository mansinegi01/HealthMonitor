const express = require("express");
const router = express.Router();
const {
  addPost,
  getAllPost,
  likePost,
  commentPost,
} = require("../controller/userPosts");

router.post("/addPost", addPost);
router.get("/viewPost", getAllPost);
router.put("/:id/likePost", likePost);
router.post("/:id/commentPost", commentPost);

module.exports = router;
