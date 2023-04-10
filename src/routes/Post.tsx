import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { UserData, loginState } from "../atoms";
import { postContents } from "../components/api";
import { useNavigate } from "react-router-dom";
import Nav from "../components/NavBar";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  min-width: 300px;
`;
const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  input {
    border: 1px solid black;
    width: 200px;
  }
`;

const Post = () => {
  const isLoggedIn = useRecoilValue(loginState);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn !== true) {
      navigate("/");
    }
  }, []);
  const { register, handleSubmit, watch } = useForm({ mode: "onSubmit" });
  const [imageData, setImageData] = useState<string | null>(null);
  const userData = useRecoilValue(UserData);
  const userEmail = userData.email;
  const onValid = async (data: any) => {
    const postingData = { email: userEmail, ...data, image: imageData };
    const result = await postContents(postingData);
    console.log(result);
    console.log(postingData);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Set the image data as the value of the "image" input field
        setImageData(reader.result?.toString() ?? null);
      };
    }
  };

  return (
    <Wrapper>
      <Nav />
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register("title", { required: true })} placeholder="title" />
        <input
          {...register("content", { required: true })}
          placeholder="Content"
        />
        <input
          type="file"
          {...register("image")}
          accept="image/png,image/jpg"
          onChange={handleFileUpload}
        />
        <button>Submit</button>
      </Form>
    </Wrapper>
  );
};

export default Post;
