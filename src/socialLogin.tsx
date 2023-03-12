import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginState } from "./atoms";

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

const GoogleLoginWrapper = styled.div`
  width: 100%;
  padding: 0px 10px;
  box-sizing: border-box;
  border: 1px solid #d3d3d3;
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    background-color: #f3f3f3;
  }
  img {
    width: 20px;
    margin-right: 10px;
  }
`;

export const GoogleLoginButton = () => {
  const setIsLoggedIn = useSetRecoilState(loginState);
  const googleSocialLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      setIsLoggedIn(true);
    },
    onError: (codeResponse) => console.log(codeResponse),
    flow: "auth-code",
    redirect_uri: "http://127.0.0.1:8080/auth/google/callback",
  });

  return (
    <GoogleLoginWrapper onClick={googleSocialLogin}>
      <div className="social_login_image_box">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png?20230305195327"
          alt="google_login"
        />
      </div>
      <div className="social_login_text_box">구글로 시작하기</div>
      <div className="social_login_blank_box"> </div>
    </GoogleLoginWrapper>
  );
};
