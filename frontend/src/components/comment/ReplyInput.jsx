import React, { useState } from "react";
import "./comments.css";
import { postReply } from "../../fetch/comments";

const ReplyInput = (props) => {
  const [reply, setReply] = useState("");
  const { commentID, fetchAllPostComments, userName, updateDisplayReply } =
    props;
  console.log(fetchAllPostComments);
  const handleReplySubmit = (event) => {
    event.preventDefault();
    let body = {
      comment: reply,
      userName: userName || "john",
    };
    postReply(body, commentID)
      .then(() => fetchAllPostComments())
      .catch((err) => console.log("error ", err));
    updateDisplayReply(false);
  };
  return (
    <form className="comment-form">
      <textarea
        name=""
        id=""
        value={reply}
        cols="30"
        rows="10"
        onChange={(e) => setReply(e.target.value)}
      ></textarea>
      <button type="submit" onClick={handleReplySubmit}>
        Submit
      </button>
    </form>
  );
};

export default ReplyInput;
