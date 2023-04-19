import { googleLogout } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { loginState, UserData } from "../atoms";
import { IUserData } from "../components/KakaoLogin";
import axios from "axios";
import qs from "qs";
import { postDataAuth } from "../components/api";
import Nav from "../components/NavBar";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const InfoForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10%;
`;

const SelectGender = styled.div``;

interface iUserInfo {
  nickname: string;
  birthday: string;
  phone: string;
  gender: string;
  cities_code: string;
  address: string;
  profile_image: string;
}

function User() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const { register, handleSubmit } = useForm({ mode: "onSubmit" });
  const [userData, setUserData] = useRecoilState<IUserData>(UserData);
  const [profileImage, setProfileImage] = useState(userData.profile_image);
  const [username, setUsername] = useState(userData.nickname);

  // fetchDataAuth()

  const data = {
    email: userData.email,
    password: "00000000",
  };
  postDataAuth(data);

  const handleEditPhoto = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          //create canvas element and set max width

          // create a new canvas element
          const canvas = document.createElement("canvas");
          // set the maximum width of the image to be 800 pixels
          const MAX_WIDTH = 800;
          // calculate the scale size based on the image width and maximum width
          const scaleSize = MAX_WIDTH / img.width;
          // set the width and height of the canvas based on the maximum width and scaled height
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          // get the 2D rendering context of the canvas
          const ctx = canvas.getContext("2d");
          // draw the image onto the canvas with the scaled dimensions
          ctx && ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          // convert the canvas to a data URL with JPEG format and 80% quality
          const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
          // set the image data as the value of the "image" input field

          setProfileImage(dataUrl);
        };
      };
    }
  };
  const onValid = (e: any) => {
    const result = { ...e, profile_image: profileImage };
    updateUser(result, userData.email);
  };

  const updateUser = async (userInfo: iUserInfo, email: string) => {
    const data = qs.stringify(userInfo);

    const config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `https://port-0-area-node-express-r8xoo2mledsvukh.sel3.cloudtype.app/users/:email`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      setUserData({
        ...userData,
        profile_image: profileImage,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Nav />
      <InfoForm onSubmit={handleSubmit(onValid)}>
        <img src={profileImage} style={{ width: 200, height: 200 }} />
        <input
          type="file"
          {...register("profile_image")}
          accept="image/png,image/jpg"
          onChange={handleEditPhoto}
        />
        <input
          type="input"
          {...register("username")}
          placeholder="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="text"
          {...register("birthday")}
          placeholder="YYMMDD"
          required
          pattern="\d{6}"
          maxLength={6}
        />
        <input
          type="text"
          {...register("phone")}
          placeholder="010XXXXYYYY"
          pattern="\d{11}"
          minLength={11}
          maxLength={11}
        />

        <SelectGender>
          <label>
            <input type="radio" value="M" {...register("gender")} />
            Male
          </label>
          <label>
            <input type="radio" value="F" {...register("gender")} />
            Female
          </label>
        </SelectGender>
        <input
          type="text"
          placeholder="city code"
          {...register("cities_code")}
          required
        />
        <input type="text" placeholder="address" {...register("address")} />
        <button>submit</button>
      </InfoForm>
    </Wrapper>
  );
}

export default User;
