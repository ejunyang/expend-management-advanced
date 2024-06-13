import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import ExesList from "../component/ExesList";
import ExesForm from "../component/ExesForm";
import MonthList from "../component/MonthList";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Authapi from "../axios/Authapi";

const Home = () => {
  const { isAuthenticated, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await Authapi.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("사용자 정보를 가지고오지 못했습니다.", error);
      }
    };
    fetchUserInfo();
  }, [isAuthenticated, navigate]);

  return (
    <StWrap>
      <StContainer>
        <MonthList />
        <ExesList />
        <ExesForm />
      </StContainer>
    </StWrap>
  );
};

export default Home;

const StWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const StContainer = styled.section`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;
