import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { isAuthenticated, logout, userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("정말로 로그아웃 하시겠습니까?");
    if (confirmLogout) {
      logout();
      navigate("/login");
    }
  };

  return (
    <>
      <StHeaderWrap>
        <StHeaderInner>
          <Link to="/">
            <h1>💸</h1>
          </Link>
          <ul>
            {isAuthenticated && userInfo ? (
              <>
                <li>
                  <p>
                    <img src={userInfo.avatar} />
                  </p>
                  {`${userInfo.nickname} 님 반갑습니다.`}
                </li>
                <Link to="/mypage">
                  <li>마이페이지</li>
                </Link>
                <Link onClick={handleLogout}>
                  <li>로그아웃</li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/join">
                  <li>회원가입</li>
                </Link>
                <Link to="/login">
                  <li>로그인</li>
                </Link>
              </>
            )}
          </ul>
        </StHeaderInner>
      </StHeaderWrap>
    </>
  );
};

export default Header;

const StHeaderWrap = styled.div`
  width: 100%;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  p {
    width: 1.2rem;
    height: 1.2rem;
    overflow: hidden;
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 5px;
  }
  img {
    width: 100%;
  }
`;

const StHeaderInner = styled.div`
  max-width: 660px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  padding: 1.1rem 0;
  align-items: center;
  h1 {
    font-size: 2rem;
  }
  ul {
    display: flex;
    gap: 15px;
    font-size: 0.8rem;
    align-items: center;
  }
`;
