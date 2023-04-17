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

const Wrapper = styled.div`
  display: flex;
`;
const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function User() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const resetUserData = useResetRecoilState(UserData);
  const userData = useRecoilValue<IUserData>(UserData);

  const logOut = () => {
    setIsLoggedIn(false);
    resetUserData();
    sessionStorage.removeItem("userData");
    googleLogout();
  };
  // fetchDataAuth()

  const data = {
    email: userData.email,
    password: "00000000",
  };
  postDataAuth(data);
  return (
    <Wrapper>
      <Nav />
      <Info>
        <img
          src={userData?.profile_image}
          style={{ width: 200, height: 200 }}
        />
        <button>Edit Photo</button>
        <h1>{userData?.nickname}</h1>
        <h1>{userData?.email}</h1>
        <Link to={"/"}>
          <button onClick={logOut}>Go Back</button>
        </Link>
      </Info>
    </Wrapper>
  );
}

export default User;
