import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Group from "../group/Group";
import QuestionPreview from "../post/QuestionPreview";
import "./home.css";

const Home = (props) => {
  const [groupQues, setGroupQues] = useState([]);
  const navigate = useNavigate();
  // let previewData
  return (
    <>
      <Group setGroupQues={setGroupQues} />
      <section className="home">
        <div>
          <h4>All Questions</h4>
          <button onClick={() => navigate("/create-post")}>Ask Question</button>
        </div>
        <hr />
        {!groupQues.length &&
          props.questionsPreview.map((question) => (
            <QuestionPreview
              key={question._id}
              {...question}
              userDetails={props.userDetails}
            />
          ))}
        {groupQues.map((question) => (
          <QuestionPreview
            key={question._id}
            {...question}
            userDetails={props.userDetails}
          />
        ))}
      </section>
    </>
  );
};

export default Home;
