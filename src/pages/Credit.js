import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SpecialThanksTo from "components/credit/SpecialThanksTo";
import Sponsors from "components/credit/Sponsors";
import Thankyou from "components/credit/Thankyou";
import ThinkGivers from "components/credit/ThinkGivers";
import MusicComponent from "components/credit/MusicComponent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  justify-content: center;
  align-items: center;
  background-color: black;
  width: 100%;
  overflow-y: scroll;
  color: white;
  padding: 100vh 0;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: var(--gold);
`;

const Credit = () => {
  const [init, setInit] = useState(false);
  const [commentState, setCommentState] = useState(false);

  return (
    <Container>
      <MusicComponent init={init} setInit={setInit} commentState={commentState} setCommentState={setCommentState} />

      <Title style={{ opacity: !init && "0" }}>서랍장 명예의 전당</Title>
      {/* 컴포넌트로 분리함 */}
      <Sponsors init={init} />
      <ThinkGivers init={init} />
      <SpecialThanksTo init={init} />
      <Thankyou commentState={commentState} />
    </Container>
  );
};

export default Credit;
