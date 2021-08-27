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
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args),
        })
      } else {
        setUserObj(null)
      }
      setInit(true)
    })
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <Container>
      <GlobalStyle />
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser = {refreshUser} />
      : "Loading..."
        }
    </Container>
  );
}

export default App;
