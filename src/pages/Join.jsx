import React, { useContext } from "react";
import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Authapi from "../axios/Authapi";
import { AuthContext } from "../context/AuthContext";

const Join = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id === "" || password === "" || nickname === "") {
      Swal.fire({
        icon: "warning",
        html: `빈칸을 입력하세요`,
        showCancelButton: false,
        confirmButtonText: "확인",
      });
      return;
    }

    if (id.length < 4 || id.length > 10) {
      Swal.fire({
        icon: "warning",
        html: `아이디는 4~10글자 이내로 입력해주세요.`,
        showCancelButton: false,
        confirmButtonText: "확인",
      });
      return;
    }

    if (password.length < 4 || password.length > 15) {
      Swal.fire({
        icon: "warning",
        html: `비밀번호는 4~15글자 이내로 입력해주세요.`,
        showCancelButton: false,
        confirmButtonText: "확인",
      });
      return;
    }

    if (nickname.length < 1 || nickname.length > 10) {
      Swal.fire({
        icon: "warning",
        html: `닉네임은 1~10글자 이내로 입력해주세요.`,
        showCancelButton: false,
        confirmButtonText: "확인",
      });
      return;
    }

    try {
      // 회원가입 요청
      const response = await Authapi.post("/register", {
        id,
        password,
        nickname,
      });
      const data = response.data;
      if (data.success) {
        const user = { id, password, nickname, avatar: null };
        setUserInfo(user);
        localStorage.setItem("userInfo", JSON.stringify(user));
        console.log("userInfo", user);

        Swal.fire({
          icon: "success",
          title: `${nickname}님 환영합니다.`,
          html: `로그인 페이지로 이동합니다.`,
          showCancelButton: false,
          confirmButtonText: "확인",
        }).then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          icon: "error",
          html: `회원가입에 실패했습니다.`,
          showCancelButton: false,
          confirmButtonText: "확인",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      Swal.fire({
        icon: "error",
        html: `회원가입 중 오류가 발생했습니다.`,
        showCancelButton: false,
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <>
      <StWrap>
        <h1>회원가입</h1>
        <StJoinWrap>
          <StJoinForm onSubmit={handleSubmit}>
            <div>
              <label htmlFor="userId">아이디</label>
              <StInput
                type="text"
                id="userId"
                placeholder="아이디"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <span>* 4~10 글자 이내로 입력해주세요.</span>
            </div>
            <div>
              <label htmlFor="password">비밀번호</label>
              <StInput
                type="password"
                id="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>* 4~15 글자 이내로 입력해주세요.</span>
            </div>
            <div>
              <label htmlFor="name">닉네임</label>
              <StInput
                type="text"
                id="name"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <span>* 1~10 글자 이내로 입력해주세요.</span>
            </div>

            <StSubmitButton type="submit">회원가입</StSubmitButton>
            <Link to="/login">
              <StLoginButton>로그인</StLoginButton>
            </Link>
          </StJoinForm>
        </StJoinWrap>
      </StWrap>
    </>
  );
};

export default Join;

const StWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 560px;
  margin: 5rem auto;
  h1 {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;

const StJoinWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 50px;
  width: 100%;
  background: #fff;
  border-radius: 15px;
  box-shadow: 10px 10px 10px #efefef;
`;

const StJoinForm = styled.form`
  width: 100%;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  div {
  }
  label {
    display: block;
    margin: 0 0 10px;
  }
  span {
    display: block;
    color: #89acec;
    font-size: 0.65rem;
    margin: 10px;
  }
`;

const StInput = styled.input`
  width: calc(100% - 1.5rem);
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 0.8rem;
`;

const StSubmitButton = styled.button`
  background: #89acec;
  color: #fff;
  border: none;
  padding: 15px;
  border-radius: 10px;
  margin-top: 25px;
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    background: #557bb5;
  }
`;

const StLoginButton = styled.button`
  background: #f4f5f7;
  border: none;
  padding: 15px;
  border-radius: 10px;
  width: 100%;
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    background: #ddd;
  }
`;
