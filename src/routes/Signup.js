import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import Footer from "../components/Footer";

const borderColor = "#d6d6d6";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90vh;
  position: relative;
  margin-top: 50px;
  button {
    background-color: #0095f6;
    border: none;
    padding: 8px;
    border-radius: 8px;
    width: 286px;
    color: white;
    font-size: 15px;
    cursor: pointer;
  }
  input {
    height: 35px;
  }
`;
const FacebookIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;
const Wrapper__top = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 70px;
  color: gray;
  width: 360px;
`;

const RightBox = styled.div``;

const LoginBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  border: 1px solid ${borderColor};

  .logo {
    width: 60%;
    margin: 30px 0px;
  }
  a {
    text-decoration: none;
  }

  .forgot_password {
    margin-top: 20px;
    font-size: 12px;
    color: #01376b;
  }
  span {
    font-size: 20px;
  }
`;
const BoxTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 286px;
  border-bottom: 1px solid ${borderColor};
  position: relative;
  margin-bottom: 20px;
  button {
    margin: 20px 0;
  }
  #or {
    position: absolute;
    bottom: -10px;
    background-color: white;
    padding: 0 20px;
  }
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;

  position: relative;
  margin-bottom: 30px;

  div {
    margin-bottom: 20px;
  }
  span {
    width: 100%;
    font-size: 12px;
    font-weight: 400;
    color: gray;
    text-align: center;
  }
  a {
    display: inline-block;
    color: darkblue;
    font-size: 15px;
    margin-left: 5px;
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

function Signup() {
  return (
    <Wrapper>
      <Wrapper__top>
        <RightBox>
          <LoginBox>
            <BoxTop>
              <img className="logo" src={`/img/Instagram_logo.png`} />
              <span>친구들의 사진과 동영상을 보려면 가입하세요.</span>
              <button>
                <a href="/" className="facebook">
                  <FacebookIcon icon={faSquareFacebook}></FacebookIcon>
                  Facebook으로 로그인
                </a>
              </button>
              <div id="or">또는</div>
            </BoxTop>
            <LoginForm>
              <Input placeholder="휴대폰 번호 또는 이메일 주소" />
              <Input placeholder="성명" />
              <Input placeholder="사용자 이름" />
              <Input placeholder="비밀번호" type="password" />
              <div>
                <span>
                  저희 서비스를 이용하는 사람이 회원님의 연락처 정보를
                  Instagrm에 업로드 했을수도 있습니다.
                </span>

                <a href="/signup">더 알아보기</a>
              </div>
              <button>가입</button>
            </LoginForm>
          </LoginBox>

          <AccountBox>
            <span>계정이 있으신가요?</span>
            <a href="/">로그인</a>
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
      </Wrapper__top>
      <Footer />
    </Wrapper>
  );
}

export default Signup;
