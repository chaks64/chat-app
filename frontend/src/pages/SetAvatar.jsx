import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";

export default function SetAvatar() {
  const api = "https://api.multiavatar.com";
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectAvatar, setSelectAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePictuire = async () => {
    if (selectAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else{
      const user = await JSON.parse(localStorage.getItem("chat-app"));
      const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
        image: avatar[selectAvatar],
      })

      if(data.isSet){
        user.isAvatar = true;
        user.avatar = data.image;
        localStorage.setItem("chat-app", JSON.stringify(user));
        navigate("/");
      }
    }
  };

  async function fetchData() {
    const data = [];
    let temp = Math.round(Math.random() * 100000000);
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(`${api}/${temp}`);
      temp += 10;
      const buffer = new Buffer(image.data);

      console.log(image);
      data.push(buffer.toString("base64"));
    }
    setAvatar(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(!localStorage.getItem("chat-app")){
      navigate('/login')
    } else{
      fetchData();
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>

          <div className="avatars">
            {avatar.map((ava, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${ava}`}
                    alt="Avatar"
                    onClick={() => setSelectAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePictuire}>
            Set Profile Picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }

    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
