import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { KakaoLogin } from "../components/KakaoLogin";
import { GoogleLoginButton } from "../socialLogin";

const borderColor = "#d6d6d6";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
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
    margin-top: 20px;
    background-color: #ffeb00;
    color: black;
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

const InputBox = styled.div`
  position: relative;
  display: flex;
  height: 20px;
`;
const Input = styled.input`
  padding: 0px 10px;
  /* margin-bottom: 10px; */
  background-color: #fafafa;
  border: 1px solid ${borderColor};
  width: 100%;
`;

const InputValidation = styled.span`
  display: flex;
  position: absolute;
  left: 250px;
  top: 10px;
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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const { name, userId, email, password } = watch();

  const onValid = (data: any) => {
    console.log(email);
  };

  return (
    <Wrapper>
      <Wrapper__top>
        <RightBox>
          <LoginBox>
            <BoxTop>
              <img className="logo" src={`/img/Instagram_logo.png`} />
              <span>???????????? ????????? ???????????? ????????? ???????????????.</span>
              <KakaoLogin />
              <GoogleLoginButton />
              <div id="or">??????</div>
            </BoxTop>
            <LoginForm onSubmit={handleSubmit(onValid)}>
              <InputBox>
                <Input
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^(?:\d{3}-\d{4}-\d{4}|\w+@\w+\.\w{2,3})$/,
                      message: "asd",
                    },
                  })}
                  placeholder="????????? ?????? ?????? ????????? ??????"
                />
                <InputValidation>
                  {errors.email ? (
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      style={{ color: "red", fontSize: "20px" }}
                    />
                  ) : null}
                  {!errors.email && email ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      style={{ fontSize: "20px" }}
                    />
                  ) : null}
                </InputValidation>
              </InputBox>
              <InputBox>
                <Input
                  {...register("name", { required: "Add Name" })}
                  placeholder="??????"
                />
                <InputValidation>
                  {errors.name ? (
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      style={{ color: "red", fontSize: "20px" }}
                    />
                  ) : null}
                  {!errors.name && name ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      style={{ fontSize: "20px" }}
                    />
                  ) : null}
                </InputValidation>
              </InputBox>
              <InputBox>
                <Input
                  {...register("userId", { required: "Add User ID" })}
                  placeholder="????????? ??????"
                />
                <InputValidation>
                  {errors.userId ? (
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      style={{ color: "red", fontSize: "20px" }}
                    />
                  ) : null}
                  {!errors.userId && userId ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      style={{ fontSize: "20px" }}
                    />
                  ) : null}
                </InputValidation>
              </InputBox>
              <InputBox>
                <Input
                  {...register("password", { required: "Add Password" })}
                  placeholder="????????????"
                  type="password"
                />
                <InputValidation>
                  {errors.password ? (
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      style={{ color: "red", fontSize: "20px" }}
                    />
                  ) : null}
                  {!errors.password && password ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      style={{ fontSize: "20px" }}
                    />
                  ) : null}
                </InputValidation>
              </InputBox>
              <div>
                <span>
                  ?????? ???????????? ???????????? ????????? ???????????? ????????? ?????????
                  Instagrm??? ????????? ???????????? ????????????.
                </span>

                <a href="/signup">??? ????????????</a>
              </div>
              <button>??????</button>
            </LoginForm>
          </LoginBox>

          <AccountBox>
            <span>????????? ????????????????</span>
            <a href="/">?????????</a>
          </AccountBox>
          <DownloadApp>
            <div className="title">?????? ?????????????????????</div>
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
