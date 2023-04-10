import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { UserData, loginState } from "../atoms";
import {
  iReadPost,
  iReadPosts,
  postContents,
  readPost,
  readPosts,
} from "../components/api";
import { useNavigate } from "react-router-dom";
import Nav from "../components/NavBar";
import qs from "qs";
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  min-width: 300px;
`;
const Lists = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const List = () => {
  const isLoggedIn = useRecoilValue(loginState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      if (isLoggedIn !== true) {
        navigate("/");
      } else {
        const readPostInput: iReadPosts = {
          start: "0",
          listn: "50",
        };
        const readPostId: iReadPost = {
          id: "21",
        };
        const result = await readPost(readPostId);
        console.log("result : ", result);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Wrapper>
      <Nav />
      <Lists></Lists>
    </Wrapper>
  );
};

export default List;
