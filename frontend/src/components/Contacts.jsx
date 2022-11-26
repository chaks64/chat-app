import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [userName, setUserName] = useState(undefined);
  const [userImage, setUserImage] = useState(undefined);
  const [userSelected, setUserSelected] = useState(undefined);

  useEffect(() => {
    const data =  JSON.parse(localStorage.getItem("chat-app"));
    console.log(currentUser);
    // if (currentUser) {
      setUserImage(data.avatar);
      setUserName(data.username);
    //   setUserSelected
    // }
  }, []);

  const changeCurrentChat = (index, contact) => {
    setUserSelected(index);
    changeChat(contact)
  };

  return (
    <>
      {userImage && userName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h3>Snappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === userSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() =>{changeCurrentChat(index, contact)}}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatar}`}
                      alt="Avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img 
                src={`data:image/svg+xml;base64,${userImage}`}
                alt="Avatar"
              />
            </div>
            <div className="username">
              <h2>{userName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #000420;
    .brand{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img{
            height: 2rem;
        }
        h3{
            color: white;
            text-transform: uppercase;
        }
    }
    .contacts{
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem; &::-webkit-scrollbar{
          width: 0.2rem;
          &-thumb{
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
          }
        }
        .contact{
            background-color: #ffffff39;
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            gap: 1rem;
            align-items: center;
            display: flex;
            transition: 0.5s ease-in-out;
            .avatar{
                img{
                    height: 3rem;
                }
            }
            .username{
                h3{
                    color: white;
                }
            }
        }
        .selected{
            background-color: #9186f3;
        }
    }
    .current-user{
            background-color: #0d0d30;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            .avatar{
                img{
                    height: 4rem;
                    max-inline-size: 100%;
                }
            }
            .username{
                h2{
                    color: white;
                }
            }
            /* @media screen and (min-width: 720px) and (max-width: 1000px){
                gap: 0.5rem;
                .username{
                    h2{
                        font-size: 1rem;
                    }
                }
            } */
        }
`;
