const express = require("express");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const {
  postQuestion,
  upvoteQuestion,
  downvoteQuestion,
  getQuestion,
  searchQuestionByTitle,
  searchQuestionByTechnology,
} = require("../controllers/question");
const router = express.Router();

router.get("/question/:questionID", getQuestion);

router.post("/post-question", postQuestion);

router.post("/upvote-question", upvoteQuestion);
router.post("/downvote-question", downvoteQuestion);
router.post("/search/", searchQuestionByTitle);
router.get("/group/:title", searchQuestionByTechnology);

module.exports = router;
