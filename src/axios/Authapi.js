import axios from "axios";

const Authapi = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
});
export default Authapi;
