import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import Messages from "./Messages";
import axios from "axios";
import { getMessage, sendMessage } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, currentUser }) {
  const [messsages, setMessages] = useState([]);

  useEffect(() => {
    async function changeChat() {
      console.log("test test test", currentUser);
      const response = await axios.post(getMessage, {
        from: currentUser._id.toString(),
        to: currentChat._id.toString(),
      });
      console.log(response.data);
      setMessages(response.data);
    }
    changeChat();
  }, [currentChat, currentUser]);

  const handleMessage = async (msg) => {
    await axios.post(sendMessage, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
  };

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
              <div>
                <div
                  key={index}
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
