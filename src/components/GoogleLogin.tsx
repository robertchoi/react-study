import {
  CodeResponse,
  GoogleLogin,
  TokenResponse,
  useGoogleLogin,
} from "@react-oauth/google";

import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginState, UserData } from "../atoms";
import axios from "axios";
import { useEffect, useState } from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { IUserData, IUserDataSaveData } from "./KakaoLogin";
import { postDataAuth, postInsertUserData, putUserData } from "./fetch";

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
  const [user, setUser] = useState<TokenResponse>();

  const [userData, setUserData] = useRecoilState<IUserData>(UserData);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          const { id, email, picture, name } = res.data;

          const loggedInUserData: IUserData = {
            id,
            email,
            nickname: name,
            profile_image: picture,
          };
          const loggedInUserDataAll: IUserDataSaveData = {
            nickname: name,
            birthday: "asd",
            phone: "",
            gender: "male",
            cities_code: 0,
            address: "",
            profile_image: picture,
          };
          setUserData(loggedInUserData);
          sessionStorage.setItem("userData", JSON.stringify(loggedInUserData));
          setIsLoggedIn(true);
          const data = {
            email,
            password: "00000000",
            profile_img: picture,
          };

          const userDataResult = await putUserData(loggedInUserDataAll, email);
          const insertResult = await postInsertUserData(data);

          console.log(userDataResult?.data);
          console.log(insertResult);

          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <GoogleLoginWrapper onClick={() => login()}>
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
