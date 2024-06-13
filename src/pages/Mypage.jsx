import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Authapi from "../axios/Authapi";
import Swal from "sweetalert2";
import { IoIosArrowBack } from "react-icons/io";

const MyPage = ({}) => {
  const [newNickname, setNewNickname] = useState("");
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { isAuthenticated, userInfo, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: "warning",
        html: `로그인이 필요합니다.`,
        showCancelButton: false,
        confirmButtonText: "확인",
      });
      navigate("/login");
    } else {
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
          console.error("Failed to fetch user info:", error);
        }
      };
      fetchUserInfo();
    }
  }, [isAuthenticated, navigate]);

  const handleImageChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0]; //파일 객체
    setImageFile(file);
    reader.readAsDataURL(file); //파일 객체 -> url
    reader.onload = () => {
      setImagePreview(reader.result);
    };
  };

  const handleInfoChange = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("nickname", newNickname);
      formData.append("avatar", imageFile);

      const response = await Authapi.patch("/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        const imageUrl = response.data.avatar;
        const updatedUserInfo = {
          ...userInfo,
          nickname: response.data.nickname,
          avatar: imageUrl,
        };
        setUserInfo(updatedUserInfo);
        Swal.fire({
          icon: "success",
          html: `정보 수정이 완료되었습니다.`,
          showCancelButton: false,
          confirmButtonText: "확인",
        });
        setNewNickname("");

        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
      } else {
        Swal.fire({
          icon: "error",
          html: `정보 수정에 실패했습니다.`,
          showCancelButton: false,
          confirmButtonText: "확인",
        });
      }
    } catch (error) {
      console.error("Failed to update info:", error);
      alert("정보 수정에 실패했습니다.");
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <StWrap>
        <TopWrap>
          <IoIosArrowBack
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          <h1>마이페이지</h1>
          <IoIosArrowBack style={{ fontSize: "25px", opacity: "0" }} />
        </TopWrap>

        <StmyPageWrap>
          <StImg>
            <img src={userInfo.avatar} />
          </StImg>
          <p>
            🎉 {userInfo.nickname} <span>님 반갑습니다.</span>
          </p>

          <StButton onClick={() => setOpen(!open)} open={open}>
            프로필 관리
          </StButton>

          {open ? (
            <form onSubmit={handleInfoChange}>
              <span>아이디 : {userInfo.id}</span>
              <PrivewImage>
                <img src={imagePreview ? imagePreview : userInfo.avatar} />
              </PrivewImage>
              <input type="file" onChange={handleImageChange} />
              <StInput
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                placeholder="새로운 닉네임"
              />
              <StSubmit type="submit">수정</StSubmit>
            </form>
          ) : null}
        </StmyPageWrap>
      </StWrap>
    </>
  );
};

export default MyPage;

const StWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 660px;
  margin: 5rem auto;
  gap: 50px;
  h1 {
    font-size: 1.2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 3rem 0;
  }
`;

const StInput = styled.input`
  border: 1px solid #ddd;
  padding: 10px 15px;
  border-radius: 10px;
`;

const StmyPageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0px;
  width: 100%;
  background: #fff;
  border-radius: 15px;
  box-shadow: 10px 10px 10px #efefef;
  p {
    font-weight: 600;
    font-size: 1.2rem;
    margin: 2rem 0;
  }
  span {
    font-weight: normal;
  }
`;

const StImg = styled.div`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #ddd;

  img {
    width: 100%;
  }
`;

const StButton = styled.button`
  background: #f4f5f7;
  border-radius: 10px;
  padding: 10px 20px;
  border: none;
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    background-color: #ddd;
  }
`;

const StSubmit = styled.button`
  background-color: #89acec;
  padding: 10px 15px;
  border: none;
  border-radius: 10px;
  color: #fff;
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    background: #557bb5;
  }
`;

const PrivewImage = styled.div`
  width: 5rem;
  height: 5rem;
  overflow: hidden;
  img {
    width: 100%;
  }
`;

const TopWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  h1 {
    font-size: 28px;
    font-weight: bold;
    margin: 15px 0;
    text-align: center;
    flex-grow: 2;
  }
`;
