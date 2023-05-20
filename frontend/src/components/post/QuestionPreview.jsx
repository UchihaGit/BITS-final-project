import React from "react";
import { useNavigate } from "react-router-dom";
import "./questionPreview.css";

const QuestionPreview = ({
  upvotes,
  shotDescription,
  technology,
  createdAt,
  userName,
  _id,
  userDetails,
}) => {
  const navigate = useNavigate();
  userDetails;

  return (
    <div
      className="preview"
      onClick={() => navigate(`/question/${_id}`, { state: userDetails })}
    >
      <span>{upvotes} votes</span>
      <div className="description">
        <h4>{shotDescription}</h4>
        <div>{technology}</div>
      </div>
      <div className="user-info">
        <div>{userName} </div>
        <div> {new Date(createdAt).toDateString()}</div>
      </div>
    </div>
  );
};

export default QuestionPreview;
