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
  font-size: 1.5rem;
  font-family: Jeju Myeongjo;
`;

const AuthBox = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 100%;
  z-index: 9;
`;

const Notice = styled.span`
  color: var(--gold);
  margin-bottom: 15px;
  font-size: 0.9rem;
  z-index: 9;
  :hover {
    cursor: pointer;
  }
`;

const Welcome = styled(animated.div)`
  color: white;
  font-size: 0.9rem;
  opacity: 0;
  transition: 1s all ease-in-out;
`;

const Auth = () => {
    const [authState, setAuthState] = useState(false);
    const [codeState, setCodeState] = useState(false);

    const animation = useSpring({
      top: authState ? "150px" : "200px",
      config: config.molasses
    })

    const welcomeAni = useSpring({
      opacity: !authState && 1,
      config: config.molasses
    })

    const onClick = () => {
      setAuthState(!authState)
    }

    return (
      <Container>
        <Background onClick={onClick} />
        <Title style={animation}>누군가의 서랍장</Title>
        {authState 
        ? (
        <AuthBox>
        <Notice onClick={() => {setCodeState(!codeState)}}>코드를 입력해주세요.</Notice>
        <Login setCodeState={setCodeState} codeState={codeState} />
        </AuthBox>
        ) : <Welcome style={welcomeAni}>입장하시려면 터치해주세요.</Welcome>}
      </Container>
    );
  }
  
  export default Auth;
  