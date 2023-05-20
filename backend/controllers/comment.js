const Comment = require("../models/comment");

exports.addComment = (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, cmt) => {
    if (err) {
      console.log(err);
    }
    return res.status(201).json(cmt);
  });
};

exports.getCommentsOfPost1 = (req, res) => {
  Comment.find({ postID: req.params.postID }).exec((err, comments) => {
    if (err) {
      return res.status(404).json({
        error: "comments not found",
      });
    }
    return res.status(200).json(comments);
  });
};

exports.addReply = async (req, res) => {
  let parentComment = await Comment.findById(req.params.commentID);
  const reply = new Comment({ ...req.body, parent: parentComment._id });
  await reply.save();
  parentComment.replies.push(reply._id);
  await parentComment.save();
  return res.status(200).json(parentComment);
  // Comment.findByIdAndUpdate(
  //   { _id: req.params.commentID },
  //   { $push: { replies: comment } },
  //   { new: true, useFindAndModify: false },
  //   (err, reply) => {
  //     if (err) {
  //       return res.status(400).json({
  //         error: "Unable to save reply",
  //       });
  //     }
  //     console.log(":success?", reply);
  //     return res.status(200).json(reply);
  //   }
  // );
};

exports.upvoteComment = (req, res) => {
  let amount = req.body.type == "uncheck" ? -1 : 1;
  Comment.findByIdAndUpdate(
    { _id: req.body._id },
    { $inc: { upvotes: amount }, $push: { votedBy: req.body.voter } },
    { new: true },
    (err, comment) => {
      if (err) {
        return res.status(500).json({
          error: `No able to update ${req.body.type}`,
        });
      }

      return res.status(201).json(comment);
    }
  );
};

exports.downvoteComment = (req, res) => {
  let amount = req.body.type == "uncheck" ? -1 : 1;
  Comment.findByIdAndUpdate(
    { _id: req.body._id },
    { $inc: { upvotes: amount }, $push: { votedBy: req.body.voter } },
    { new: true },
    (err, comment) => {
      if (err) {
        return res.status(500).json({
          error: `No able to update ${req.body.type}`,
        });
      }

      return res.status(201).json(comment);
    }
  );
};

exports.getCommentsOfPost = async (req, res) => {
  async function populateReplies(comment) {
    const populated = await comment.populate("replies").execPopulate();
    const populatedReplies = await Promise.all(
      populated.replies.map((reply) => populateReplies(reply))
    );
    return {
      ...populated.toObject(),
      replies: populatedReplies,
    };
  }
  const comments = await Comment.find({ postID: req.params.postID }).exec();
  const populatedComments = await Promise.all(
    comments.map((comment) => populateReplies(comment))
  );

  return res.status(200).json(populatedComments);
};
