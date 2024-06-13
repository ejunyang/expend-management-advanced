import { createContext, useEffect, useState } from "react";

export const ExpenseContext = createContext(null); //컨텍스트 생성

export const ExpenseProvider = ({ children }) => {
  const initialSelectedMonth = localStorage.getItem("selectedMonth")
    ? parseInt(localStorage.getItem("selectedMonth"))
    : new Date().getMonth() + 1;

  const [selectedMonth, setSelectedMonth] = useState(initialSelectedMonth);

  useEffect(() => {
    localStorage.setItem("selectedMonth", JSON.stringify(selectedMonth));
  }, [selectedMonth]);

  return (
    <>
      <ExpenseContext.Provider
        value={{
          selectedMonth,
          setSelectedMonth,
        }}
      >
        {children}
      </ExpenseContext.Provider>
    </>
  );
};
