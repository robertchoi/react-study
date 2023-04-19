import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faCompass,
  faHeart,
  faHouse,
  faList,
  faPaperPlane,
  faPlusSquare,
  faSearch,
  faUser,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: black;
  color: white;
  font-size: 25px;
  div {
    display: flex;
  }
  position: fixed;
  width: 100%;
  bottom: 0;
`;
const Logo = styled.div`
  height: 10%;
`;
const NavBtns = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
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
      <NavBtns>
        <Link to="/">
          <Icon icon={faHouse} />
        </Link>
        <Icon icon={faSearch} />
        <Link to="/list">
          <Icon icon={faList} />
        </Link>
        <Icon icon={faPaperPlane} />
        <Link to="/post">
          <Icon icon={faPlusSquare} />
        </Link>
        <Link to="/user">
          <Icon icon={faUser} />
        </Link>
      </NavBtns>
    </Wrapper>
  );
}
