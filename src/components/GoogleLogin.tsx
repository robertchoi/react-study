import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginState } from "../atoms";

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
