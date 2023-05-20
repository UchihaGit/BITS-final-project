const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      trim: true,
      required: true,
    },
    replies: [this],
    authorID: {
      type: String,
    },
    postID: {
      type: String,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    votedBy: {
      type: Array,
    },
    userName: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
