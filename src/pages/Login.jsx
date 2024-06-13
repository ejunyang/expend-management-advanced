import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import Authapi from "../axios/Authapi";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id === "" || password === "") {
      Swal.fire({
        icon: "warning",
        html: `빈칸을 입력하세요`,
        showCancelButton: false,
        confirmButtonText: "확인",
      });
      return;
    }
    try {
      const response = await Authapi.post("/login", {
        id,
        password,
      });
      const data = response.data;
      if (data.success) {
        login(data.accessToken);
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          html: `
          로그인에 실패했습니다.
          `,
          showCancelButton: false,
          confirmButtonText: "확인",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  return (
    <>
      <StWrap>
        <h1>로그인</h1>

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
            </div>

            <StSubmitButton type="submit">로그인</StSubmitButton>
            <Link to="/join">
              <StLoginButton>회원가입</StLoginButton>
            </Link>
          </StJoinForm>
        </StJoinWrap>
      </StWrap>
    </>
  );
};

export default Login;

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
  align-items: flex-start;
  padding: 30px 50px;
  width: 100%;
  background: #fff;
  box-shadow: 10px 10px 10px #efefef;
  border-radius: 15px;
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
