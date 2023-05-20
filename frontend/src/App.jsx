import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./components/user/Signin";
import Signup from "./components/user/Signup";
import Header from "./components/header/header";
import Home from "./components/home/Home";
import CreatePost from "./components/post/CreatePost";
import { useState } from "react";
import Question from "./components/post/Question";
import Authentication from "./components/auth/Authentication";
import Chat from "./components/chat/Chat";

function App() {
  const [userDetails, setUserDetails] = useState({
    authorID: "",
    name: "",
    email: "",
  });
  const [questionsPreview, setQuestionsPreview] = useState([]);
  const [allMessages, setAllMessages] = useState([]);

  return (
    <div className="App">
      <Header setQuestionsPreview={setQuestionsPreview} />
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route
          path="/home"
          element={
            <Authentication id={userDetails.authorID}>
              <Home
                questionsPreview={questionsPreview}
                userDetails={userDetails}
              />
            </Authentication>
          }
        />
        <Route path="/signup" index element={<Signup />} />
        <Route
          path="/signin"
          element={<Signin setUserDetails={setUserDetails} />}
        />
        <Route
          path="/create-post"
          element={
            <Authentication id={userDetails.authorID}>
              <CreatePost userDetails={userDetails} />
            </Authentication>
          }
        />
        <Route
          path="/question/:questionID"
          element={
            <Authentication id={userDetails.authorID}>
              <Question
                allMessages={allMessages}
                setAllMessages={setAllMessages}
              />
            </Authentication>
          }
        />
        <Route
          path="/chat"
          element={
            <Authentication id={userDetails.authorID}>
              <Chat allMessages={allMessages} setAllMessages={setAllMessages} />
            </Authentication>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
