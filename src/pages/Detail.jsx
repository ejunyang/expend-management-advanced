import React, { useCallback, useContext, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { getSelected, putExpense, deleteExpense } from "../axios/ExpenseApi";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { ExpenseContext } from "../context/ExpenseContext";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);
  const { selectedMonth } = useContext(ExpenseContext);
  const queryClient = new QueryClient();

  //해당 지출내역
  const {
    data: exe = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["expenses", id], queryFn: getSelected });

  const dateRef = useRef(exe.date);
  const itemRef = useRef(exe.item);
  const descRef = useRef(exe.desc);
  const amountRef = useRef(exe.amount);

  useEffect(() => {
    if (exe) {
      dateRef.current.value = exe.date || "";
      itemRef.current.value = exe.item || "";
      descRef.current.value = exe.desc || "";
      amountRef.current.value = exe.amount || "";
    }
  }, [exe]);

  const mutationEdit = useMutation({
    mutationFn: putExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
      navigate("/");
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
      navigate("/");
    },
  });

  const onRemove = useCallback(
    (id) => {
      if (confirm("정말 삭제하시겠습니까?") == true) {
        mutationDelete.mutate(id);
      }
    },
    [exe]
  );

  const onModify = useCallback(() => {
    const modifiedData = {
      id: exe.id,
      date: dateRef.current.value,
      item: itemRef.current.value,
      amount: +amountRef.current.value,
      desc: descRef.current.value,
      month: selectedMonth,
      user: userInfo.id,
    };

    mutationEdit.mutate(modifiedData);
  }, [exe, userInfo, selectedMonth, mutationEdit]);

  return (
    <>
      <StContainer>
        <TopWrap>
          <IoIosArrowBack
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          <H1>상세 내역</H1>
          <IoIosArrowBack style={{ fontSize: "25px", opacity: "0" }} />
        </TopWrap>

        <ExeItem>
          <ExeHead>{exe.item}</ExeHead>
          <ExeItemP>
            {exe.desc} <Sapn>{exe.date}</Sapn>
          </ExeItemP>
          <H2>{exe.amount}원</H2>
        </ExeItem>

        <DetailContainer>
          <label>사용자</label>
          <StInput defaultValue={exe.user} readOnly />
          <label>날짜</label>
          <StInput ref={dateRef} defaultValue={exe.date} />
          <label>항목</label>
          <StSelect ref={itemRef} defaultValue={exe.item}>
            <option defaultValue={exe.item}>🎬</option>
            <option defaultValue={exe.item}>🍜</option>
            <option defaultValue={exe.item}>🍿</option>
            <option defaultValue={exe.item}>📚</option>
            <option defaultValue={exe.item}>👕</option>
            <option defaultValue={exe.item}>🧗🏻</option>
          </StSelect>
          <label>내용</label>
          <StInput ref={descRef} defaultValue={exe.desc} />
          <label>금액</label>
          <StInput ref={amountRef} defaultValue={exe.amount} />

          <ButtonWrap>
            <EditButton onClick={() => onModify(id)}>수정</EditButton>
            <RemoveButton onClick={() => onRemove(id)}>삭제</RemoveButton>
          </ButtonWrap>
        </DetailContainer>
      </StContainer>
    </>
  );
};

export default Detail;

const TopWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const StContainer = styled.section`
  max-width: 660px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin: 30px auto;
`;

const H1 = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin: 15px 0;
  text-align: center;
  flex-grow: 2;
`;

const DetailContainer = styled.div`
  max-width: 600px;
  background-color: #fff;
  padding: 30px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ExeItem = styled.li`
  background: #fff;
  border-radius: 15px;
  display: flex;
  width: 600px;
  padding: 30px;
  flex-flow: wrap row;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  margin: 15px 0;
  box-shadow: 10px 10px 10px #efefef;
`;

const ExeItemP = styled.p`
  flex: auto;
`;
const Sapn = styled.span`
  display: block;
  font-size: 15px;
  color: #ccc;
  margin-top: 5px;
`;

const ExeHead = styled.p`
  margin-right: 15px;
  font-size: 30px;
`;

const H2 = styled.h2`
  font-weight: bold;
`;

const StInput = styled.input`
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin: 30px 0;
`;

const StSelect = styled.select`
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
`;

const EditButton = styled.button`
  background: #89acec;
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background: #557bb5;
  }
`;

const RemoveButton = styled.button`
  background: #f4f5f7;
  color: #2e2e2e;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background: #cecece;
  }
`;
