import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import AppRouter from "./Router";

const GlobalStyle = createGlobalStyle`
  ${reset};
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppRouter />
    </>
  );
}

export default App;
