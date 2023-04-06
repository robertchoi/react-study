import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faCompass,
  faHeart,
  faHouse,
  faPaperPlane,
  faPlusSquare,
  faSearch,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: black;
  color: white;
  font-size: 25px;
  height: 100vh;
  width: 70px;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const Logo = styled.div`
  height: 10%;
`;
const NavBtns = styled.div`
  flex-direction: column;
  height: 80%;
`;
const More = styled.div`
  height: 10%;
`;
const Icon = styled(FontAwesomeIcon)`
  margin: 20px 0;
`;

export default function Nav() {
  return (
    <Wrapper>
      <Logo>
        <Icon icon={faInstagram} />
      </Logo>
      <NavBtns>
        <Link to="/">
          <Icon icon={faHouse} />
        </Link>
        <Icon icon={faSearch} />
        <Icon icon={faVideo} />
        <Icon icon={faPaperPlane} />
        <Icon icon={faHeart} />
        <Icon icon={faPlusSquare} />
      </NavBtns>
      <More>
        <Icon icon={faBars} />
      </More>
    </Wrapper>
  );
}