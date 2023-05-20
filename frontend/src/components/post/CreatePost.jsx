import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../fetch/post";
import "./createpost.css";

const CreatePost = ({ userDetails }) => {
  const [values, setValues] = useState({
    userName: userDetails.name,
    shotDescription: "",
    longDescription: "",
    technology: "REACT",
    authorID: userDetails.authorID,
  });
  const navigate = useNavigate();

  const { shotDescription, longDescription, technology } = values;

  const handleChange = (name, event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handlePostSubmission = (event) => {
    event.preventDefault();
    createPost(values)
      .then((data) => {
        console.log(data);
        navigate(`/question/${data._id}`, { state: userDetails });
      })
      .catch((e) => console.log("cannot create post", e));
  };
  return (
    <section className="page create-post">
      <form>
        <label>Title of the question</label>
        <input
          name="shotDescription"
          value={shotDescription}
          type="text"
          onChange={(event) => handleChange("shotDescription", event)}
        />
        <label>Long description of the question</label>
        <textarea
          name="longDescription"
          value={longDescription}
          id=""
          cols="30"
          rows="10"
          onChange={(event) => handleChange("longDescription", event)}
        ></textarea>
        <label>Technology</label>
        <select
          value={technology}
          name="technology"
          onChange={(event) => handleChange("technology", event)}
        >
          <option value="REACT">REACT</option>
          <option value="JAVASCRIPT">JAVASCRIPT</option>
          <option value="NODE">NODE</option>
          <option value="EXPRESS">EXPRESS</option>
          <option value="MONGODB">MONGODB</option>
          <option value="MONGOOSE">MONGOOSE</option>
          <option value="SOCKET.IO">SOCKET.IO</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="OTHERS">OTHERS</option>
        </select>
        <button className="page" onClick={handlePostSubmission}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
