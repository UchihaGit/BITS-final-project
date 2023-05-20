const { validationResult } = require("express-validator");
const Question = require("../models/question");

exports.getQuestion = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  Question.find({ _id: req.params.questionID }).exec((err, question) => {
    if (err) {
      return res.status(404).json({
        error: "question not found",
      });
    }
    return res.status(200).json(question);
  });
};

exports.postQuestion = (req, res) => {
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const question = new Question(req.body);
  question.save((err, ques) => {
    if (err) {
      res.status(400).json({
        error: "cannot create question",
      });
    }
    return res.json(ques);
  });
};

exports.upvoteQuestion = (req, res) => {
  let amount = req.body.type == "uncheck" ? -1 : 1;
  Question.findByIdAndUpdate(
    { _id: req.body._id },
    { $inc: { upvotes: amount }, $push: { votedBy: req.body.voter } },
    { new: true },
    (err, question) => {
      if (err) {
        return res.status(500).json({
          error: `No able to update ${req.body.type}`,
        });
      }

      return res.status(201).json(question);
    }
  );
};

exports.downvoteQuestion = (req, res) => {
  let amount = req.body.type == "uncheck" ? -1 : 1;
  Question.findByIdAndUpdate(
    { _id: req.body._id },
    { $inc: { upvotes: amount }, $push: { votedBy: req.body.voter } },
    { new: true },
    (err, question) => {
      if (err) {
        return res.status(500).json({
          error: `No able to update ${req.body.type}`,
        });
      }

      return res.status(201).json(question);
    }
  );
};

exports.searchQuestionByTitle = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  Question.find({
    shotDescription: { $regex: req.body.title, $options: "i" },
  }).exec((err, posts) => {
    if (err) {
      return res.status(404).json({
        error: "question not found",
      });
    }
    return res.status(200).json(posts);
  });
};

exports.searchQuestionByTechnology = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  Question.find({
    technology: { $regex: req.params.title },
  }).exec((err, posts) => {
    if (err) {
      return res.status(404).json({
        error: "question not found",
      });
    }
    return res.status(200).json(posts);
  });
};
