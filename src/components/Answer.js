import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  padding: 25px 30px 20px 30px;
  box-sizing: border-box;
  border: 1px solid black;
  box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.75);
  -webkit-box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.75);
  color: white;
  border-radius: 10px;
  background-color: var(--main-color);
  margin: 10px;
  :hover {
      color: var(--gold);
      cursor: pointer;
  }
`;

const Question = styled.h1`
transition: 0.3s all ease-in-out;
  font-family: Jeju Myeongjo;
  margin-bottom: 20px;
`;

const CreatedAt = styled.span`
  color: white;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 10px;
`;

const Writer = styled.span``;

const Content = styled.div`
  background-color: white;
  border-radius: 10px;
  font-family: Jeju Myeongjo;
  width: 100%;
  padding: 15px;
  font-size: 14px;
  opacity: 70%;
  color: black;
`;

const Answer = ({answer}) => {
  const lastTime = (Date.now() - answer.createdAt) / 1000 / 60
  const lastMinute = Math.round(lastTime)
  return (
    <Container>
      <Question>{answer.question}</Question>
      <CreatedAt>{lastMinute}분 전</CreatedAt>
      <Writer>{answer.userName}</Writer>
      <Content>{answer.answer}</Content>
    </Container>
  );
}

export default Answer;
  