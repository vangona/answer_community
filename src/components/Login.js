import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { authService } from "../fBase";
import { useState } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";

const Container = styled(animated.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 9;
`;

const LoginContainer = styled.div`
  margin-bottom: 10px;
`;

const LoginInput = styled.input`
    transition: 0.3s all ease-in-out;
    :focus {
      border-radius: 10px;
    }    
`;

const LoginBtn = styled.button`
    font-family: Jeju Myeongjo;
    padding: 3px;
    :hover {
        cursor: pointer;
    }
`;

const Error = styled(animated.span)`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: var(--gold);
  word-break: keep-all;
  width: 80%;
  font-size: 12px;
`;

const Login = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signInWithEmailAndPassword(
      code, code) 
      setCode("");
    } catch (error) {
      if (error.message === "The email address is badly formatted.") {
        setError("이메일 형식을 확인해주세요.")
      } else if (error.message === "There is no user record corresponding to this identifier. The user may have been deleted.") {
        setError("정확한 코드를 입력했는지 확인해주세요.")
      }
      else {
        setError(error.message)
      }
    }
  }

  const onChange = e => {
    setCode(e.target.value)
  }

  const animation = useSpring({
      from : {
          opacity : 0
      },
      to: {
          opacity: 1
      },
      config: config.gentle
  })

  const errorAni = useSpring({
    opacity: error ? 1 : 0,
    config: config.gentle
  })

  return (
    <Container style={animation}>
      <LoginContainer>
        <LoginInput onChange={onChange} value={code} type="text" />
          <LoginBtn onClick={onSubmit}>입장하기</LoginBtn>
      </LoginContainer>
          <Error style={errorAni}>{error}</Error>
    </Container>
  );
}

export default Login;
  