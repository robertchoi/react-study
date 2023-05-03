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
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/NavBar";
import qs from "qs";
import { Link } from "react-router-dom";
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

const ListData = styled.li`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  img {
    width: 100px;
    height: 100px;
  }
`;

interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
  email: string;
  image: string;
  reaction: string;
  report: null | string;
  tags_code: string;
  upvote: string;
  username: string;
}

const ListDetail = () => {
  const isLoggedIn = useRecoilValue(loginState);
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState<Post>();

  useEffect(() => {
    const fetchPosts = async () => {
      if (isLoggedIn !== true) {
        navigate("/");
      } else {
        const readPostId: iReadPost = {
          id: `${id}`,
        };
        const result = await readPost(readPostId);
        if (result) {
          setPost(result[0]);
        }
      }
    };
    fetchPosts();
  }, []);

  return (
    <Wrapper>
      <Nav />
      <Lists>
        {post && (
          <ListData key={post.id}>
            <span>{post.username}</span>
            <img src={post.image} />
            <span>{post.content}</span>
          </ListData>
        )}
      </Lists>
    </Wrapper>
  );
};

export default ListDetail;
