import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginState } from "../atoms";

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
    redirect_uri: "http://127.0.0.1:8080/kakao-login",
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

export interface IKakaoData {
  id: number;
  kakao_account: { email: string; gender: boolean };
  properties: {
    nickname: string;
    profile_image: string;
    thumbnail_image: string;
  };
}
export const FinishKakaoLogin = ({ code }: FinishKakaoLoginProps) => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [kakaoData, setKakaoData] = useState<IKakaoData>();

  useEffect(() => {
    const baseUrl = "https://kauth.kakao.com/oauth/token";
    const config = {
      client_id: "d40768c0a7713feacbc40a16c77a08bf",
      client_secret: "AoMHS1j30H8LIi0Vrn4OK2KLmdBWTKHD",
      grant_type: "authorization_code",
      redirect_uri: "http://127.0.0.1:8080/kakao-login",
      code: code as string,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;

    const fetchKakaoData = async () => {
      const kakaoTokenRequest = await (
        await fetch(finalUrl, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
        })
      ).json();

      if ("access_token" in kakaoTokenRequest) {
        const { access_token } = kakaoTokenRequest;
        const userData = await (
          await fetch("https://kapi.kakao.com/v2/user/me", {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-type": "application/json",
            },
          })
        ).json();
        setKakaoData(userData);
      }
    };
    fetchKakaoData();
  }, [code]);

  if (!code) {
    console.log("code not found");
  } else {
    setIsLoggedIn(true);
  }

  const logOut = () => setIsLoggedIn(false);
  return (
    <>
      <h1 style={{ fontSize: 30 }}>Logged In</h1>
      <h1>{kakaoData?.properties.nickname}</h1>
      <img
        src={kakaoData?.properties.profile_image}
        style={{ width: 200, height: 200 }}
      />
      <h1>{kakaoData?.kakao_account.email}</h1>
      <Link to={"/"}>
        <button onClick={logOut}>Go Back</button>
      </Link>
    </>
  );
};
