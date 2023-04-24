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
    console.log(imageData);
    console.log(result);
    console.log(postingData);
    navigate("/list");
  };
  useEffect(() => {
    console.log(typeof ImageData);
    function base64ToImage(base64Data: string, fileName: string): void {
      const link = document.createElement("a");
      link.href = base64Data;
      link.download = fileName;
      link.click();
    }
  }, [ImageData]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();
      //returns Base64-encoded url
      reader.readAsDataURL(file);
      reader.onload = () => {
        //Resize process

        //loads image into img
        const img = new Image();
        img.src = reader.result as string;
        //size setting
        img.onload = () => {
          //create canvas element and set max width

          // create a new canvas element
          const canvas = document.createElement("canvas");
          // set the maximum width of the image to be 800 pixels
          const MAX_WIDTH = 800;
          // calculate the scale size based on the image width and maximum width
          const scaleSize = MAX_WIDTH / img.width;
          // set the width and height of the canvas based on the maximum width and scaled height
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          // get the 2D rendering context of the canvas
          const ctx = canvas.getContext("2d");
          // draw the image onto the canvas with the scaled dimensions
          ctx && ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          // convert the canvas to a data URL with JPEG format and 80% quality
          const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
          // set the image data as the value of the "image" input field
          setImageData(dataUrl);
        };
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
        {imageData && (
          <img src={imageData as string} style={{ width: 200, height: 200 }} />
        )}
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
