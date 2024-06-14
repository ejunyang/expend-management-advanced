import React, { useContext } from "react";
import ExesItem from "./ExesItem";
import { useQuery } from "@tanstack/react-query";
import { getExpense } from "../axios/ExpenseApi";
import { ExpenseContext } from "../context/ExpenseContext";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";

const ExesList = () => {
  const { selectedMonth } = useContext(ExpenseContext);
  const { userInfo } = useContext(AuthContext);

  const {
    data: expenses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpense,
  });

  const filteredExpenses = userInfo
    ? expenses.filter(
        (exe) => exe.month === selectedMonth && exe.user === userInfo.id
      )
    : [];

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  if (error) {
    return <div>데이터를 불러오지 못했습니다.</div>;
  }

  const totalAmount =
    filteredExpenses && filteredExpenses.length > 0
      ? filteredExpenses.reduce((acc, cur) => {
          return (acc += cur.amount);
        }, 0)
      : 0;

  return (
    <div>
      <TotalTitle>
        {`${selectedMonth + 1}월`} 한 달 동안
        <strong>총 {totalAmount}원</strong>
        사용했어요.
      </TotalTitle>
      <ul>
        {filteredExpenses &&
          filteredExpenses.map((exe) => {
            return <ExesItem key={exe.id} exe={exe} />;
          })}
      </ul>
    </div>
  );
};

export default ExesList;

const TotalTitle = styled.h1`
  font-size: 38px;
  font-weight: 200;
  line-height: 1.2em;
  margin: 50px 0 0px 0;
  strong {
    font-weight: 700;
    display: block;
  }
`;
