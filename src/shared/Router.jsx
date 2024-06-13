import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Layout from "./Layout";
import Login from "../pages/Login";
import Join from "../pages/Join";
import Mypage from "../pages/Mypage";

const Router = () => {
  // PrivateRoute : 로그인이 필요한 페이지에 접근할 수 있도록 하는 컴포넌트
  // 로그인이 되어있지 않은 사용자는 login 페이지로 리다이렉트
  // const PrivateRoute = ({ element: Element, ...rest }) => {
  //   const { isAuthenticated } = useContext(AuthContext);
  //   return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
  // };

  // PublicRoute : 로그인이 필요없는 페이지에 접근할 수 있도록 하는 컴포넌트
  // 로그인이 되어있는 사용자는 mypage로 리다이렉트
  // const PublicRoute = ({ element: Element, ...rest }) => {
  //   const { isAuthenticated } = useContext(AuthContext);
  //   return !isAuthenticated ? <Element {...rest} /> : <Navigate to="/mypage" />;
  // };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default Router;
