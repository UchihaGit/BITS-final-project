import React, { useEffect } from "react";
import useState from "react-usestateref";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getQuestion } from "../../fetch/question";
import { downVoteQues, upVoteQues } from "../../fetch/votes";
import "./question.css";
import Comments from "../comment/Comments";

const Question = ({ userDetails, allMessages }) => {
  console.log(allMessages);
  const [question, setQuestion] = useState({});
  const [upvoted, setUpvoted, upvotedRef] = useState(false);
  const [falseFlag, setFalseFlag, falseFlagRef] = useState(true);
  const location = useLocation();
  const { questionID } = useParams();
  const {
    shotDescription,
    longDescription,
    technology,
    markedAsSolved,
    authorID,
    userName,
    upvotes,
    downvotes,
    createdAt,
  } = question;

  if (!userDetails) {
    userDetails = location.state;
  }
  useEffect(() => {
    const fetchQuestion = () => {
      getQuestion(questionID)
        .then((response) => setQuestion(response[0]))
        .catch((err) => console.log(err));
    };
    fetchQuestion();
  }, [questionID]);

  const updateVote = async (type) => {
    let data;
    setUpvoted((value) => {
      if (value == false && type == "uncheck") {
        return false;
      }
      setFalseFlag(true);
      return !value;
    });
    if (upvotedRef.current) {
      data = await upVoteQues({ type: "check", _id: questionID });
      setQuestion(data);
    } else if (falseFlagRef.current) {
      setFalseFlag(false);
      data = await downVoteQues({ type: "uncheck", _id: questionID });
      setQuestion(data);
    }
  };

  return (
    <>
      {userDetails.authorID == question.authorID ? (
        <button>
          <Link to="/chat" state={userDetails}>
            Accept Incomming Chat
          </Link>
        </button>
      ) : (
        <button>
          <Link to="/chat" state={userDetails}>
            Initiate Chat with author
          </Link>
        </button>
      )}

      <section className="page question">
        <div className="post-info">
          <div>
            <label>
              <b>Posted by:</b>
            </label>
            <span>{userName}</span> | <span>{technology}</span>
          </div>
          <div>
            <span>{new Date(createdAt).toDateString()}</span>
          </div>
        </div>
        <h4>{shotDescription}</h4>
        <div className="lg-desc-sec">
          <div className="votes-parent">
            <span>{upvotes}</span>
            <div className="votes">
              <button
                className={upvoted && "orange"}
                id="upvote"
                onClick={() => updateVote("check")}
              ></button>
              <button
                id="downvote"
                onClick={() => updateVote("uncheck")}
              ></button>
            </div>
          </div>
          <div className="long-desc">
            <p>{longDescription}</p>
          </div>
        </div>
      </section>
      <Comments userDetails={userDetails} questionID={questionID} />
    </>
  );
};

export default Question;
