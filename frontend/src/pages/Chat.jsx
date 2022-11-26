import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";


function Chat() {
  const navigate = useNavigate();
  const [contacts, setContact] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() =>{
     async function userSet() {
      if(!localStorage.getItem("chat-app")){
        navigate('/login')
      } else{
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app')));
      }
    }
    userSet();
  }, [])

  useEffect(() =>{
    async function getAllUsers(){
      const data1 = await JSON.parse(localStorage.getItem("chat-app"));
      if(currentUser){
        if(currentUser.isAvatar){
          const data = await axios.get(`${allUsersRoute}/${data1._id}`)
          console.log(data.data);
          setContact(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }

    getAllUsers();
  },[currentUser])

  const handleChatChange = (chat) =>{
    setCurrentChat(chat);
  }

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
      </div>
      </Container>
  )
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
  .container{
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1000px){
      grid-template-columns: 35% 65%;

    }
  }
`;

export default Chat