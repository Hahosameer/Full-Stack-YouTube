import axios from "axios";
import React, { useState } from "react";
// import { Link } from 'react-router-dom'
import styled from "styled-components";
import {
  loginFailure,
  loginStart,
  loginSuccess,

} from "../../redux/userSlice.js";
import { useDispatch } from "react-redux";
import { auth, provider } from "../../firebase.js";
import { signInWithPopup } from "firebase/auth";
import { serverUrl } from "../../components/utils/appConstans.js";
// import { loginFailure, loginStart, loginSuccess } from "../../redux/videoSlice.js";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(90vh - 10vh);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  gap: 10px;
  padding: 10px 40px;

  @media screen and (max-width: 347px) {
    // Adjust width for screens less than or equal to 768px
    padding: 10px 30px;
  }
`;
const Tittle = styled.h1`
  font-size: 16px;
`;
const SubTittle = styled.h2`
  font-size: 14px;
  font-weight: 300;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  border-radius: 3px;
  padding: 6px;
  width: 100%;
  color: ${({ theme }) => theme.text};
  &::placeholder {
    color: ${({ theme }) =>
      theme.placeholderColor}; // Set placeholder color based on theme
  }
`;
const Button = styled.button`
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  cursor: pointer;
`;
const More = styled.div`
  display: flex;
  font-size: 10px;
  margin-top: 10px;
`;
const Links = styled.div`
  margin-left: 50px;
  color: ${({ theme }) => theme.textSoft};
`;
const Link = styled.span`
  margin-left: 15px;
`;
function SignIn() {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      // let axiosConfig = {
      //   headers: {
      //     "Content-Type": "application/json;charset=UTF-8",
      //     "Access-Control-Allow-Origin": "*"
      //   }  
      // };
      const res = await axios.post(`${serverUrl}/api/auth/signin`, {
        name,
        password,
      });
      console.log("signin response",res)
      dispatch(loginSuccess(res.data));

      console.log(res.data);
    } catch (error) {
      dispatch(loginFailure());
    }
  };

  
  const signInwithGoogle = async () => {
    dispatch(loginStart());

    try {
        const result = await signInWithPopup(auth, provider);
        const response = await axios.post(`${serverUrl}/api/auth/google`, {
            name: result?.user?.displayName,
            email: result?.user?.email,
            img: result?.user?.photoURL,
        }, { withCredentials: true }); // Set withCredentials to true
        console.log("response" , response)
        dispatch(loginSuccess(response.data));
    } catch (error) {
        console.error("Error signing in with Google or making API call:", error);
        dispatch(loginFailure());
    }
};

  return (
    <Container>
      <Wrapper>
        <Tittle>Sign in</Tittle>
        <SubTittle>to continue to Sameer S.k</SubTittle>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign in</Button>
        <Button onClick={signInwithGoogle}>Signin with google</Button>
        <Tittle>or</Tittle>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
}

export default SignIn;
