import styled, { keyframes } from "styled-components";

const FooterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: gray;
  p {
    margin-top: 20px;
  }
`;

const MenuTab = styled.div`
  a {
    text-decoration: none;
    font-size: 13px;
    margin: 0 5px;
    color: inherit;
  }
`;

function Footer() {
  return (
    <FooterDiv>
      <MenuTab>
        <a href="/about">Meta</a>
        <a href="/about">소개</a>
        <a href="/about">블로그</a>
        <a href="/about">채용 정보</a>
        <a href="/about">도움말</a>
        <a href="/about">API</a>
        <a href="/about">개인정보처리방침</a>
        <a href="/about">약관</a>
        <a href="/about">인기 계정</a>
        <a href="/about">위치</a>
        <a href="/about">Instagram Lite</a>
        <a href="/about">연락처 업로드 & 비사용자</a>
        <a href="/about">Meta Verified</a>
      </MenuTab>
      <p>&copy; 2023 My Instagram Clone</p>
    </FooterDiv>
  );
}

export default Footer;
