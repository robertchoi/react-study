import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useRecoilValue } from "recoil";
import { widthSize } from "../atoms";

const Wrapper = styled.div`
  padding: 30px 70px;
  position: relative;
`;
const fadeInAnimation = keyframes`
  from {
    top: -100px;
  }
  to {
    top: 30px;
}
`;
const fadeOutAnimation = keyframes`
  from {
    top: 30px;
  }
  to {
    top: -100px;
  }
`;

interface IMenuProps {
  isHide: boolean;
}

const MenuBar = styled.div<IMenuProps>`
  font-size: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 95%;
  animation: ${(props) => (props.isHide ? fadeOutAnimation : fadeInAnimation)}
    0.5s ease-in-out;
`;
const InstaImg = styled.img`
  width: 100px;
`;

const MenuLeft = styled.div`
  cursor: pointer;
`;
const MenuRight = styled.div`
  display: flex;
  align-items: center;
  a {
    margin-right: 50px;
  }
`;

const Contents = styled.div`
  margin-top: 100px;
`;
const getContentMainFontSize = (widthSize: number) => {
  if (widthSize > 1100) {
    return "100px";
  } else if (widthSize > 800) {
    return "80px";
  } else {
    return "50px";
  }
};

const Content__Main = styled.div`
  display: flex;
  font-size: ${() => getContentMainFontSize(useRecoilValue(widthSize))};
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 80px;
  img {
    width: 30vw;
  }
  .middle {
    text-align: end;
  }
`;
const Content__Main__Text = styled.div``;
function About() {
  const width = useRecoilValue(widthSize);
  const [height, setHeight] = useState(0);
  const [isHide, setIsHide] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setHeight(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll);
    if (height > 150) {
      setIsHide(true);
    } else {
      setIsHide(false);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [height]);

  return (
    <Wrapper>
      {isHide ? (
        <></>
      ) : (
        <MenuBar isHide={isHide}>
          <MenuLeft>
            <FontAwesomeIcon icon={faBars} />
          </MenuLeft>
          <MenuRight>
            <Link to={"/"}>로그인</Link>
            <Link to={"/about"}>
              <InstaImg src="/img/Insta_logo.png" />
            </Link>
          </MenuRight>
        </MenuBar>
      )}

      <Contents>
        <Content__Main>
          <Content__Main__Text>
            Give people the power to build community
          </Content__Main__Text>
          <img src="/img/aboutImg1.jpeg" />
        </Content__Main>
        <Content__Main>
          <img src="/img/aboutImg2.jpeg" />
          <Content__Main__Text className="middle">
            and bring the world closer together
          </Content__Main__Text>
        </Content__Main>
        <Content__Main>
          <Content__Main__Text>
            Give people the power to build community
          </Content__Main__Text>
          <img src="/img/aboutImg3.jpeg" />
        </Content__Main>
      </Contents>
      <Footer />
    </Wrapper>
  );
}

export default About;
