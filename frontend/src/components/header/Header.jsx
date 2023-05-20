import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import "./header.css";
import { searchQuestion } from "../../fetch/question";
import { signout } from "../../fetch/auth";

const Header = (props) => {
  const location = useLocation();
  const [title, setTitle] = useState("title");
  const navigate = useNavigate();
  const searchForQuestions = async (event) => {
    navigate("/home");
    let data = await searchQuestion(title);
    props.setQuestionsPreview(data);
  };
  useEffect(() => {
    searchForQuestions();
  }, []);

  if (
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/chat"
  ) {
    return;
  }
  return (
    <>
      <nav className="navbar">
        <button className="search" onClick={() => navigate("/home")}>
          <AiOutlineHome />
        </button>
        <input
          type="text"
          placeholder="Search here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="search"
          onClick={(event) => searchForQuestions(event)}
        >
          <FaSearch />
        </button>

        <button onClick={() => signout(() => navigate("/signin"))}>
          Signout
        </button>
      </nav>
      <hr />
    </>
  );
};

export default Header;
