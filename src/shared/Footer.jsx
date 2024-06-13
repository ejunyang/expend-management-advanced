import React from "react";
import styled from "styled-components";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <StFooterWrap>
        <StFooterInner>
          <Link to="/">
            <h1>💸</h1>
          </Link>
          <ul>
            <Link to="https://github.com/ejunyang/expend-management-advanced">
              <li>
                <FaGithub
                  style={{ verticalAlign: "middle", marginRight: "5px" }}
                />
                GitHub
              </li>
            </Link>
          </ul>
        </StFooterInner>
      </StFooterWrap>
    </>
  );
};

export default Footer;

const StFooterWrap = styled.div`
  width: 100%;
  border-top: 1px solid #ddd;
  background-color: #fff;
`;

const StFooterInner = styled.div`
  max-width: 660px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  padding: 1.1rem 0;
  align-items: center;
  h1 {
    font-size: 2rem;
  }
  ul {
    display: flex;
    font-size: 0.8rem;
  }
`;
