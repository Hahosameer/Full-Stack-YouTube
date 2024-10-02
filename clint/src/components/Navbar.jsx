import React, { useState } from "react";
import TemporaryDrawer from "./Drawer";
// import styled from "styled-components";
import logoImg from "../img/logo.png";
import styled, { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import {
  AccountCircle as SignInIcon,
  Search as SearchIcon,
  Videocam as VideoCallIcon,
} from "@mui/icons-material";
import Upload from "./Upload.jsx";
import { Link, useNavigate } from "react-router-dom";
import { fabClasses } from "@mui/material";

const Topbar = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.text};
  min-width: 100%;
  height: 10vh;
  position: sticky;
  top: 0;
  z-index: 9;
  padding-right: 15px;
  /* padding-left: -15px; */
`;

const Logomain = styled.div`
  display: flex;
  align-items: center;
  /* gap: 5px; */
  /* padding: 18px; */
  font-weight: 900;
  font-size: 18px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
`;

const Img = styled.img`
  height: 25px;
  margin-left: 10px;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40%;
  /* background-color: red; */
  border: 1px solid #ccc;
  border-radius: 30px;
  padding: 0px 10px;

  @media screen and (max-width: 550px) {
    /* display: none; */
    width: 69%;
    gap: 5px;
  }
  @media screen and (max-width: 350px) {
    /* display: none; */
    width: 70%;
    gap: 5px;
  }
`;
const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: 0;
  padding: 10px;
  border-right: 1px solid #ccc;
  width: 100%;
  color: ${({ theme }) => theme.text};
  &::placeholder {
    color: ${({ theme }) =>
      theme.placeholderColor}; // Set placeholder color based on theme
  }
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  @media screen and (max-width: 457px) {
    // Adjust width for screens less than or equal to 768px
    display: none;
  }
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};

  @media screen and (max-width: 550px) {
    // Hide text when width is 350px or less

    display: none;
  }
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #999;
`;
function Navbar({ darkMode, setDarkMode }) {
  const [open, setOpen] = useState("");
  const [q, setQ] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <Topbar>
        <Logomain>
          <TemporaryDrawer darkMode={darkMode} setDarkMode={setDarkMode} />
          <Link to="/" style={{ textDecoration: "none" }} color="inherit">
            <Logo>
              <Img src={logoImg} alt="Logo" />
              <span>YouTube</span>
            </Logo>
          </Link>
        </Logomain>
        <Search>
          <Input
            placeholder="Search"
            type="Search"
            onChange={(e) => setQ(e.target.value)}
          />
          <SearchIcon
            className="SearchIcon"
            onClick={() => navigate(`/search?q=${q}`)}
          />
        </Search>
        {currentUser ? (
          <User>
            <VideoCallIcon
              onClick={() => setOpen(true)}
              style={{ cursor: "pointer" }}
            />
            <Avatar src={currentUser.img} />
            {/* {currentUser.name} */}
          </User>
        ) : (
          <Link to="signin" style={{ textDecoration: "none" }}>
            <Button>
              <SignInIcon />
              SIGN IN
            </Button>
          </Link>
        )}
      </Topbar>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
}

export default Navbar;
