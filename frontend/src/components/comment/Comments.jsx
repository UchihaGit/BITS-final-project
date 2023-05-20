import React, { useEffect, useState } from "react";
import { getPostComment, postComment } from "../../fetch/comments";
import CommentInput from "./CommentInput";
import CommentTemplate from "./CommentTemplate";

const Comments = (props) => {
  const [comment, setComment] = useState("");
  const [addComment, updateAddComment] = useState(false);
  const [comments, setComments] = useState([]);
  const { questionID, userDetails } = props;
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    let body = {
      comment,
      userName: userDetails.name || "john",
      postID: questionID,
    };
    postComment(body)
      .then(() => fetchAllPostComments())
      .catch((err) => console.log("error ", err));

    updateAddComment(false);
  };

  const fetchAllPostComments = async () => {
    let allComments = await getPostComment(questionID);
    setComments(allComments);
  };
  useEffect(() => {
    fetchAllPostComments();
  }, [questionID]);

  let commentItems = [];
  const createNestedComment = (comments, px = 0) => {
    comments.forEach((comment) => {
      commentItems.push(
        <CommentTemplate
          fetchAllPostComments={fetchAllPostComments}
          comment={comment}
          userName={userDetails.name}
          px={px}
        />
      );
      if (comment.replies.length > 0) {
        createNestedComment(comment.replies, px + 1.5);
      }
    });
    return commentItems;
  };

  return (
    <section>
      {addComment ? (
        <CommentInput
          updateAddComment={updateAddComment}
          comment={comment}
          setComment={setComment}
          handleCommentSubmit={handleCommentSubmit}
        />
      ) : (
        !comment && (
          <button onClick={() => updateAddComment(true)}>
            {comment ? "Edit " : "Add "}Comment
          </button>
        )
      )}

      {comments.length > 0 && createNestedComment(comments)}
    </section>
  );
};

export default Comments;
