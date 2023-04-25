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
  overflow-y: scroll;
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
  const [postCount, setPostCount] = useState<number>(10);
  useEffect(() => {
    const fetchPosts = async () => {
      if (isLoggedIn !== true) {
        navigate("/");
      } else {
        const readPostInput: iReadPosts = {
          start: (postCount - 10).toString(),
          listn: postCount.toString(),
        };
        const result = await readPosts(readPostInput);
        if (result) {
          setPosts(result.data.data);
        }
      }
    };
    fetchPosts();
  }, [postCount]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      console.log(scrollTop + clientHeight);
      if (scrollTop + clientHeight >= scrollHeight) {
        console.log("bottom");
        setPostCount(postCount + 10);
      }
      if (scrollTop === 0) {
        console.log("top");
        setPostCount(postCount < 10 ? 10 : postCount - 10);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [postCount]);

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
