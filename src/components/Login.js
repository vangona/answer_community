import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const Container = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 9;
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

const Login = () => {

    const onSubmit = () => {

    }

    const animation = useSpring({
        from : {
            opacity : 0
        },
        to: {
            opacity: 1
        }
    })
    return (
      <Container style={animation}>
            <LoginInput type="text" />
            <LoginBtn onClick={onSubmit}>입장하기</LoginBtn>
      </Container>
    );
  }
  
  export default Login;
  