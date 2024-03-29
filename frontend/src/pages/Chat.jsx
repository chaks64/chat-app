import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContact] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [socketConn, setSocketConn] = useState(false);

  useEffect(() => {
    async function userSet() {
      if (!localStorage.getItem("chat-app")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app")));
        setIsLoaded(true);
      }
    }
    userSet();
  }, []);

  useEffect(() => {
    async function getAllUsers() {
      // setCurrentUser(await JSON.parse(localStorage.getItem("chat-app")));
      const data1 = await JSON.parse(localStorage.getItem("chat-app"));

      if (currentUser) {
        if (currentUser.isAvatar) {
          const data = await axios.get(`${allUsersRoute}/${data1._id}`);
          setContact(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    getAllUsers();
  }, [currentUser, navigate]);

  useEffect(() => {
    // if (currentUser) {
      // setCurrentUser( JSON.parse(localStorage.getItem("chat-app")));
      socket.current = io(host);
      socket.current.emit('setup', JSON.parse(localStorage.getItem("chat-app"))._id);
      socket.current.on('connection', ()=>{
        setSocketConn(true);
      })
      // socket.current = io(host);
      // socket.current.emit("add-user", JSON.parse(localStorage.getItem("chat-app"))._id);
    // }
  }, []);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    // socket = io(host);
    socket.current.emit('join-chat', chat._id)
  };

  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1000px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
