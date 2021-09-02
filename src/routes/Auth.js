import React, { useState } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import Login from "../components/Login";
import { config } from "@fortawesome/fontawesome-svg-core";

const Container = styled.div`
  background-color: black;
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

const Title = styled(animated.h1)`
  position: absolute;
  color: white;
  margin-bottom: 20px;
  font-size: 25px;
  font-family: Jeju Myeongjo;
`;

const Welcome = styled.div``;

const Auth = () => {
    const [authState, setAuthState] = useState(false);

    const animation = useSpring({
      top: authState ? "120px" : "170px",
      config: config.molasses
    })

    const onClick = e => {
      setAuthState(!authState)
    }

    return (
      <Container>
        <Background onClick={onClick} />
        <Title style={animation}>누군가의 서랍장</Title>
        {authState 
        ? <Login />
        : <Welcome></Welcome>}
      </Container>
    );
  }
  
  export default Auth;
  