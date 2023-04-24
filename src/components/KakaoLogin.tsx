import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { loginState, UserData } from "../atoms";
import axios from "axios";
import qs from "qs";
import { postDataAuth, postInsertUserData, putUserData } from "./api";

const KakaoIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  scale: 1.3;
  width: 20px;
`;

const KakaoButton = styled.button`
  width: 100%;
  font-size: 15px;
  margin-top: 20px;
  background-color: #ffeb00;
  height: 35px;
  border-radius: 10px;
  border: none;
  padding-left: 10px;
  cursor: pointer;
  &:hover {
    background-color: #ffdd00;
  }
  a {
    display: flex;
    justify-content: space-between;
  }
`;

export const KakaoLogin = () => {
  const baseUrl = "https://kauth.kakao.com/oauth/authorize";
  const config = {
    client_id: "d40768c0a7713feacbc40a16c77a08bf",
    redirect_uri: "http://localhost:8080/kakao-login",
    response_type: "code",
  };
  const params = new URLSearchParams(config).toString();

  const finalUrl = `${baseUrl}?${params}`;
  return (
    <KakaoButton>
      <a href={finalUrl}>
        <KakaoIcon icon={faComment}></KakaoIcon>
        Kakao로 로그인
        <div className="social_login_blank_box"> </div>
      </a>
    </KakaoButton>
  );
};

interface FinishKakaoLoginProps {
  code: string | null;
}

export interface IUserData {
  id: number;
  email: string;
  nickname: string;
  profile_image: string;
}

export interface IUserDataSaveData {
  nickname: string;
  profile_image: string;
  gender: string;
  birthday: string;
  phone: string;
  cities_code: number;
  address: string;
}

export const FinishKakaoLogin = ({ code }: FinishKakaoLoginProps) => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState<IUserData>(UserData);
  useEffect(() => {
    const baseUrl = "https://kauth.kakao.com/oauth/token";
    const config = {
      client_id: "d40768c0a7713feacbc40a16c77a08bf",
      client_secret: "AoMHS1j30H8LIi0Vrn4OK2KLmdBWTKHD",
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:8080/kakao-login",
      code: code as string,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;

    const fetchKakaoData = async () => {
      const kakaoTokenRequest = await axios.post(finalUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });

      if ("access_token" in kakaoTokenRequest.data) {
        const { access_token } = kakaoTokenRequest.data;

        const userDataFromKakao = await axios.get(
          "https://kapi.kakao.com/v2/user/me",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-type": "application/json",
            },
          }
        );

        //recoil 전역 변수에 유저 데이터 저장 (꼭 필요한지?)
        const {
          id,
          kakao_account: { email, gender },
          properties: { profile_image, nickname },
        } = userDataFromKakao.data;

        const loggedInUserDataAll: IUserDataSaveData = {
          nickname,
          birthday: "asd",
          phone: "",
          gender,
          cities_code: 0,
          address: "",
          profile_image,
        };
        const loggedInUserData: IUserData = {
          id,
          email,
          nickname,
          profile_image,
        };
        setUserData(loggedInUserData);

        //Session Storage에 userdata 저장
        sessionStorage.setItem("userData", JSON.stringify(loggedInUserData));
        setIsLoggedIn(true);
        const data = {
          email: loggedInUserData.email,
          password: "00000000",
        };

        const userDataResult = await putUserData(loggedInUserDataAll, email);
        const insertResult = await postInsertUserData(data);

        navigate("/");
      }
    };
    fetchKakaoData();
  }, [code]);

  return <></>;
};
