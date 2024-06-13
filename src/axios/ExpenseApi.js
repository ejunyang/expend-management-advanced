import axios from "axios";

const JSON_SERVER_HOST = "http://localhost:4000";

export const getExpense = async () => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses`);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("데이터를 가져오지 못했습니다.");
  }
};

export const getSelected = async ({ queryKey }) => {
  try {
    const response = await axios.get(
      `${JSON_SERVER_HOST}/expenses/${queryKey[1]}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    alert("데이터를 가져오지 못했습니다.");
  }
};

export const postExpense = async (newExes) => {
  try {
    const response = await axios.post(`${JSON_SERVER_HOST}/expenses`, newExes);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("데이터를 생성하지 못했습니다.");
  }
};

export const putExpense = async (updatedExpens) => {
  const { id, ...rest } = updatedExpens;
  try {
    const response = await axios.put(
      `${JSON_SERVER_HOST}/expenses/${id}`,
      rest
    );
    return response.data;
  } catch (error) {
    console.error(error);
    alert("데이터를 업데이트하지 못했습니다.");
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await axios.delete(`${JSON_SERVER_HOST}/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("데이터를 삭제하지 못했습니다.");
  }
};
