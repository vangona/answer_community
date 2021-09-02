import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
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
  font-size: 12px;
  opacity: 70%;
  color: black;
  word-break: keep-all;
`;

const Question = styled.h1`
    transition: 0.3s all ease-in-out;
  font-family: Jeju Myeongjo;
  margin-bottom: 20px;
  font-size: 14px;
`;

const MyAnswer = ({answer}) => {
    const createdTime = new Date(answer.createdAt);
  const Year = createdTime.getFullYear();
  const Month = createdTime.getMonth();
  const DateTime = createdTime.getDate();

  return (
    <Container>
        <Question>{answer.question}</Question>
        <CreatedAt>
            {Year} - {Month < 10 ? `0${Month}` : Month} - {DateTime < 10 ? `0${DateTime}` : DateTime}
        </CreatedAt>
        <Writer>{answer.userName}</Writer>
        <Content>{answer.answer}</Content>
    </Container>
  );
}

export default MyAnswer;
  