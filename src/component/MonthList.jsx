import React, { useContext } from "react";
import "../App.css";
import styled from "styled-components";
import { ExpenseContext } from "../context/ExpenseContext";

const MonthList = () => {
  const { selectedMonth, setSelectedMonth } = useContext(ExpenseContext);

  const monthArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleMonthSelect = (idx) => {
    setSelectedMonth(idx);
  };

  return (
    <>
      <Top>
        {/* 현재 날짜로 출력 */}
        <H1>{`2024년 ${selectedMonth + 1}월`}</H1>
        <p>월간 리포트</p>
      </Top>
      <MonthWrap>
        {monthArray.map((MonthText, idx) => {
          return (
            <MonthItem
              key={idx}
              $active={selectedMonth === idx}
              onClick={() => handleMonthSelect(idx)}
            >
              {`${MonthText}월`}
            </MonthItem>
          );
        })}
      </MonthWrap>
    </>
  );
};

export default MonthList;

const Top = styled.div`
  margin: 3rem 0 0;
`;
const H1 = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin: 15px 0;
`;
const MonthWrap = styled.div`
  width: 620px;
  height: auto;
  background-color: #fff;
  display: flex;
  justify-content: center;
  border-radius: 30px;
  box-shadow: 10px 10px 10px #efefef;
  flex-flow: wrap row;
  padding: 20px;
`;
const MonthItem = styled.li`
  height: 40px;
  background-color: ${(props) => (props.$active ? "#89ACEC" : "#f4f5f7")};
  color: ${(props) => (props.$active ? "#fff" : "#2e2e2e")};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 60px;
  padding: 5px;
  width: 7%;
  margin: 20px 24px;
  cursor: pointer;
`;
