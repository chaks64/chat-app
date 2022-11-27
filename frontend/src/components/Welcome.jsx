import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from '../assets/robot.gif'

export default function Welcome({currentUser}) {
  const [userName, setUsername] = useState("");

  useEffect(() => {
    async function runUserName(){
      setUsername(await JSON.parse(localStorage.getItem("chat-app")))
    }
    runUserName()
  }, []);

  return (
    <Container>
        <img src={Robot} alt="Robot"/>
        <h1>Welcome, <span>{userName.username}!</span></h1>
        <h3>Please select a chat to Start Messaging</h3>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img{
        height: 20rem;
    }
    span{
        color: #4e00ff;
    }
`;
