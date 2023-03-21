import { googleLogout } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { loginState, UserData } from "../atoms";
import { IUserData } from "../components/KakaoLogin";
import axios from "axios";
import qs from "qs";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const resetUserData = useResetRecoilState(UserData);
  const userData = useRecoilValue<IUserData>(UserData);

  const logOut = () => {
    setIsLoggedIn(false);
    resetUserData();
    sessionStorage.removeItem("userData");
    googleLogout();
  };

  return (
    <>
      <h1 style={{ fontSize: 30 }}>Logged In</h1>
      <h1>{userData?.nickname}</h1>
      <img src={userData?.profile_image} style={{ width: 200, height: 200 }} />
      <h1>{userData?.email}</h1>
      <Link to={"/"}>
        <button onClick={logOut}>Go Back</button>
      </Link>
    </>
  );
}

export default Home;
