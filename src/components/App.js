import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { authService } from "../fBase";
import AppRouter from "./Router";

const GlobalStyle = createGlobalStyle`
  ${reset};
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
    <>
      <GlobalStyle />
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      : "Loading..."
        }
    </>
  );
}

export default App;
