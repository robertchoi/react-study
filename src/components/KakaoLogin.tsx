import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

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
