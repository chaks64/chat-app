import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import Messages from "./Messages";
import axios from "axios";
import { getMessage, sendMessage, host } from "../utils/APIRoutes";
// import { io } from "socket.io-client";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messsages, setMessages] = useState([]);
  const [arrive, setArrive] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    async function changeChat() {
      const response = await axios.post(getMessage, {
        from: currentUser._id,
        to: currentChat._id,
      });
      console.log(response.data);
      setMessages(response.data);
    }
    changeChat();
  }, [currentChat]);

  const handleMessage = async (msg) => {
    const data = await JSON.parse(localStorage.getItem("chat-app"));

    await axios.post(sendMessage, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });
    if (socket.current) {
      console.log(socket);
      socket.current.emit("new-message", {
        to: currentChat._id,
        from: data._id,
        message: msg,
      });
      //   // socket.emit('setup', JSON.parse(localStorage.getItem("chat-app"))._id);
      //   // socket.on('connection', ()=>{
      //   //   setSocketConn(true);
      //   // })
      //   console.log("$$$$$$$$$$",msg);
      //   socket1.emit("setup", {
      //     to: currentChat._id,
      //     from: data._id,
      //     message: msg,
      //   });
    }

    const msgs = [...messsages];
    msgs.push({ fromSelf: true, message: msg });
    console.log(msg, "--------");
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-received", (msg) => {
        setArrive({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrive && setMessages((prev) => [...prev, arrive]);
    console.log(messsages);
  }, [arrive]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messsages]);

  return (
    <>
      <Container>
        <div className="chat-header">
          <div className="user-details">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentChat.avatar}`}
                alt="Avatar"
              />
            </div>
            <div className="username">
              <h3>{currentChat.username}</h3>
            </div>
          </div>
          <Logout />
        </div>
        {/* <Messages/> */}

        <div className="chat-message">
          {messsages.map((message, index) => {
            return (
              <div ref={scrollRef} key={index}>
                <div
                  className={`message ${
                    message.fromSelf ? "sended" : "recived"
                  }`}
                >
                  <div className="content">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <ChatInput handleMessage={handleMessage} />
      </Container>
    </>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-auto-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }

  .chat-message {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
  }
  .sended {
    justify-content: flex-end;
    .content {
      background-color: #4f04ff21;
    }
  }
  .received {
    justify-content: flex-start;
    .content {
      background-color: #9900ff20;
    }
  }
`;
