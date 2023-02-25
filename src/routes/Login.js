import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import { faInbox } from "@fortawesome/free-solid-svg-icons";

const borderColor = "#d6d6d6";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  position: relative;
`;

const LeftBox = styled.div`
  margin-right: 20px;
  position: relative;
`;

const Img = styled.img`
  width: 450px;
  height: 600px;
`;

const fadeInOut = keyframes`
  0%{
    opacity: 0;
  }
  10%{
    opacity: 1;
  }
 
  100%{
    opacity: 0;
  }
`;

const ChangeImgs = styled.img`
  width: 250px;
  height: 520px;
  position: absolute;
  right: 73px;
  top: 30px;
  animation: ${fadeInOut} 3s;
`;

const RightBox = styled.div`
  width: 360px;
  height: 580px;
  box-sizing: border-box;
`;

const LoginBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  border: 1px solid ${borderColor};
  padding-bottom: 20px;
  .logo {
    width: 60%;
    margin: 30px 0px;
  }
  a {
    text-decoration: none;
  }
  .facebook {
    color: #4267b2;
  }
  .forgot_password {
    margin-top: 20px;
    font-size: 12px;
    color: #01376b;
  }
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  border-bottom: 1px solid ${borderColor};
  padding-bottom: 30px;
  position: relative;
  margin-bottom: 30px;
  button {
    background-color: #0095f6;
    border: none;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
  }
  #or {
    position: absolute;
    bottom: -10px;
    left: 40%;
    background-color: white;
    padding: 0 20px;
  }
`;
const Input = styled.input`
  height: 30px;
  padding: 0px 10px;
  margin-bottom: 10px;
  background-color: #fafafa;
  border: 1px solid ${borderColor};
`;

const AccountBox = styled.div`
  width: 100%;
  height: 80px;
  margin-top: 15px;
  border: 1px solid ${borderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    text-decoration: none;
    margin-left: 5px;
    color: #0095f6;
  }
`;

const DownloadApp = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin-bottom: 10px;
  }
  img {
    width: 130px;
  }
`;

function Login() {
  const [number, setNumber] = useState(1);
  // const imgList = ["loginImg1", "loginImg2", "loginImg3"];
  useEffect(() => {
    const timerId = setTimeout(() => {
      setNumber((current) => (current === 3 ? 1 : current + 1));
    }, 3000);
    return () => {
      clearTimeout(timerId);
    };
  }, [number]);

  return (
    <Wrapper>
      <LeftBox>
        <Img src={`/img/loginImgFrame.png`} />
        {/* <ChangeImgs src={`/img/${imgList[number % 3]}.png`} /> */}
        <ChangeImgs src={`/img/loginImg${number}.png`} />
      </LeftBox>

      <RightBox>
        <LoginBox>
          <img className="logo" src={`/img/Instagram_logo.png`} />
          <LoginForm>
            <Input placeholder="전화번호, 사용자 이름 또는 이메일" />
            <Input placeholder="비밀번호" type="password" />
            <button>로그인</button>
            <div id="or">또는</div>
          </LoginForm>
          <a href="/" className="facebook">
            <FontAwesomeIcon icon={faSquareFacebook}></FontAwesomeIcon>{" "}
            Facebook으로 로그인
          </a>
          <a href="/" className="forgot_password">
            비밀번호를 잊으셨나요?
          </a>
        </LoginBox>

        <AccountBox>
          <span>계정이 없으신가요?</span>
          <a href="/">가입하기</a>
        </AccountBox>
        <DownloadApp>
          <div className="title">앱을 다운로드하세요</div>
          <div>
            <a href="/">
              <img src={`/img/apple.png`} />
            </a>
            <a href="/">
              <img src={`/img/google.png`} />
            </a>
          </div>
        </DownloadApp>
      </RightBox>
    </Wrapper>
  );
}
export default Login;
