import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import "./chat.css";

const socket = io.connect(`http://localhost:8000/`);

const Chat = ({ allMessages, setAllMessages }) => {
  const [message, setMessage] = useState("");
  // const [allMessages, setAllMessages] = useState([]);
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    // socket.on("connect", () => {
    //   console.log("connected");
    //   setInitialMessage(`Joined chat ${socket.id}`);
    // });
    socket.on("receive-message", (message) => {
      // console.log("ui receiver called");
      // console.log(message);
      setAllMessages((prev) => [...prev, message]);
      //   receivedMessage(message);
    });
    return () => {
      socket.removeAllListeners();
    };
  }, [socket]);

  const sendMessage = () => {
    // console.log("send message");
    socket.emit("send-message", {
      content: message,
      sender: state.name,
    });
    setMessage("");
  };
  //   const receivedMessage = (message) => {
  //     console.log(message);
  //     setAllMessages((prev) => [...prev, message]);
  //   };
  //   socket.on("receive-message", (message) => {
  //     console.log("ui receiver called");
  //     receivedMessage(message);
  //   });
  return (
    <section>
      <div>Joined user {state.name.toUpperCase()}</div>
      {/* //render messages */}
      <section className="chat-window">
        {allMessages.map((message, index) => {
          let oddOrEven = index % 2 === 0;
          let style = {
            chat: {
              backgroundColor: oddOrEven ? "#443c68" : "",
            },
          };
          return (
            <div className="chat" style={style.chat}>
              <div className="name">{message.sender}</div>
              <div>{message.content}</div>
            </div>
          );
        })}
      </section>
      <input
        className="chat-input"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </section>
  );
};

export default Chat;
