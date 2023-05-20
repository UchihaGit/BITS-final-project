const express = require("express");
const {
  addComment,
  getCommentsOfPost,
  addReply,
  upvoteComment,
  downvoteComment,
  addCommentMiddleware,
} = require("../controllers/comment");
const router = express.Router();

router.post("/add-comment", addComment);

router.get("/comments/:postID", getCommentsOfPost);

router.post("/comments/add-reply/:commentID", addReply);

router.post("/upvote-comment", upvoteComment);
router.post("/downvote-comment", downvoteComment);

module.exports = router;
