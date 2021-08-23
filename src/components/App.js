import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { authService } from "../fBase";
import AppRouter from "./Router";

const GlobalStyle = createGlobalStyle`
  ${reset};
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: Kyobo Handwriting;
`;

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user)
      } else {
        setUserObj(null)
      }
      setInit(true)
    })
  })
  return (
    <Container>
      <GlobalStyle />
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      : "Loading..."
        }
    </Container>
  );
}

export default App;
