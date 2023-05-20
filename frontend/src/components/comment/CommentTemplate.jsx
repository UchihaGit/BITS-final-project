import React, { useEffect } from "react";
import useState from "react-usestateref";
import { FaReply } from "react-icons/fa";
import "./comments.css";
import ReplyInput from "./ReplyInput.jsx";
import { downVoteCmnt, upVoteCmnt } from "../../fetch/votes";

const CommentTemplate = (props) => {
  const {
    userName,
    createdAt,
    comment,
    _id: commentID,
    upvotes,
  } = props.comment;
  const [displayReply, updateDisplayReply] = useState(false);
  const [upvote, setUpvote, upvoteRef] = useState(false);
  const [flagClose, setFlagClose, flagCloseRef] = useState(false);
  const [commentData, setCommentData] = useState("");
  useEffect(() => {
    props.fetchAllPostComments();
  }, [commentData]);

  const handleVote = async (type) => {
    let data;
    setUpvote((prev) => {
      if (type == "downvote" && prev == false) {
        return prev;
      }
      setFlagClose(false);
      return !prev;
    });
    if (upvoteRef.current) {
      data = await upVoteCmnt({ type: "check", _id: commentID });
      setCommentData(data);
    } else if (!flagCloseRef.current) {
      setFlagClose(true);
      data = await downVoteCmnt({ type: "uncheck", _id: commentID });
      setCommentData(data);
    }
  };

  return (
    <div style={{ marginLeft: props.px + "rem" }} className="comment">
      <div className="comment-header">
        <span>{userName}</span>
        <span>{new Date(createdAt).toDateString()}</span>
      </div>
      <p>{comment}</p>
      {/* //upvote, downvote, reply comment */}
      <div className="footer">
        {upvotes}
        <button
          id="upvote"
          className={upvote && "orange"}
          onClick={() => handleVote("upvote")}
        ></button>
        <button id="downvote" onClick={() => handleVote("downvote")}></button>
        <span onClick={() => updateDisplayReply((prev) => !prev)}>
          <FaReply />
        </span>
      </div>
      {displayReply && (
        <ReplyInput
          updateDisplayReply={updateDisplayReply}
          commentID={commentID}
          fetchAllPostComments={props.fetchAllPostComments}
          userName={props.userName}
        />
      )}
    </div>
  );
};

export default CommentTemplate;
