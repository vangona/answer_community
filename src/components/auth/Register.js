import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const IDContainer = styled.div``

const PasswordContainer = styled.div``;

const RegisterInput = styled.input`
`;
const RegisterBtn = styled.button`
`;

const Register = () => {
    return (
      <Container>
          <RegisterInput type="text" />
          <RegisterInput type="password" />
      </Container>
    );
  }
  
  export default Register;
  