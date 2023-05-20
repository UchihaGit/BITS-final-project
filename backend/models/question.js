const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    shotDescription: {
      type: String,
      required: true,
      maxlength: 250,
      trim: true,
      required: true,
    },
    longDescription: {
      type: String,
      trim: true,
      required: true,
    },
    technology: {
      type: String,
      trim: true,
      enum: [
        "REACT",
        "JAVASCRIPT",
        "NODE",
        "MONGODB",
        "MONGOOSE",
        "SOCKET.IO",
        "HTML",
        "CSS",
        "EXPRESS",
        "OTHERS",
      ],
    },
    markedAsSolved: {
      type: Boolean,
      default: false,
    },
    authorID: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
