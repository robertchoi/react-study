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
import { Link } from "react-router-dom";
const Wrapper = styled.div`
  height: 150vh;
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

const List = () => {
  const isLoggedIn = useRecoilValue(loginState);
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    const fetchPosts = async () => {
      if (isLoggedIn !== true) {
        navigate("/");
      } else {
        const readPostInput: iReadPosts = {
          start: "50",
          listn: "10",
        };
        const result = await readPosts(readPostInput);
        if (result) {
          setPosts(result.data.data);
        }
      }
    };
    fetchPosts();
  }, []);

  return (
    <Wrapper>
      <Nav />
      <Lists>
        {posts &&
          posts.map((post) => (
            <Link key={post.id} to={`${post.id}`}>
              <ListData>
                <span>{post.username}</span>
                <span>{post.id}</span>
                <img src={post.image} />
              </ListData>
            </Link>
          ))}
      </Lists>
    </Wrapper>
  );
};

export default List;
