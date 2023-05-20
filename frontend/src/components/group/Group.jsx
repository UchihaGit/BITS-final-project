import React from "react";
import { searchQuestionByGroup } from "../../fetch/question";
import { technologies } from "../../utils/constants";
import "./group.css";

const Group = (props) => {
  const handleGroupSearch = async (tech) => {
    let data = await searchQuestionByGroup(tech);
    props.setGroupQues(data);
  };
  return (
    <div className="group">
      <h4>Group Title</h4>
      {technologies.map((tech) => (
        <div onClick={() => handleGroupSearch(tech)}>
          <b>{tech}</b>
        </div>
      ))}
    </div>
  );
};

export default Group;
