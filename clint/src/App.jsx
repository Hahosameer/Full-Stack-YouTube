import styled, { ThemeProvider } from "styled-components";
import "./App.css";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./components/utils/Them";
import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./Pages/Home/Home.jsx";
import Video from "./Pages/Videos/Video.jsx";
import SignIn from "./Pages/signin/Signin.jsx";
import Search from "./Pages/search/Search.jsx";

const Container = styled.div``;
const MainBottom = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
  padding: 22px 20px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
          <MainBottom>
            <Menu />
            <Main>
              <Wrapper>
                <Routes>
                  <Route path="/">
                    <Route index element={<Home type="random" />} />
                    <Route path="trend" element={<Home type="trend" />} />
                    <Route path="subscriptions" element={<Home type="sub" />} />
                    <Route path="search" element={<Search />} />
                    <Route
                      path="signin"
                      element={
                        currentUser ? <Navigate to="/" /> : <SignIn />
                      }
                    />
                    <Route path="video">
                      <Route path=":id" element={<Video />} />
                    </Route>
                  </Route>
                </Routes>
              </Wrapper>
            </Main>
          </MainBottom>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
