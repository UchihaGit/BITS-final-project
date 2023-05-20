import React from "react";
import "./comments.css";

const CommentInput = ({ comment, setComment, handleCommentSubmit }) => {
  return (
    <form className="comment-form">
      <textarea
        name=""
        id=""
        value={comment}
        cols="30"
        rows="10"
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button type="submit" onClick={handleCommentSubmit}>
        Submit
      </button>
    </form>
  );
};

export default CommentInput;
