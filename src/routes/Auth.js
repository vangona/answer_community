import React, { useState } from "react";
import styled from "styled-components";
import { useSprings, animated } from "react-spring";
import Login from "../components/Login";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  z-index: 0;
  :hover {
    cursor: pointer;
  }
`;

const Title = styled.h1`
  position: absolute;
  top: 120px;
  color: var(--gold);
  margin-bottom: 20px;
  font-size: 25px;
  font-family: Jeju Myeongjo;
`;

const Welcome = styled.div``;

const Auth = () => {
    const [authState, setAuthState] = useState(false);

    const onClick = e => {
      setAuthState(!authState)
    }

    return (
      <Container>
        <Background onClick={onClick} />
        <Title>누군가의 서랍장</Title>
        {authState 
        ? <Login />
        : <Welcome></Welcome>}
      </Container>
    );
  }
  
  export default Auth;
  