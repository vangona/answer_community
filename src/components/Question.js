import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 200px;
    border-radius: 10px;
    background-color: gray;
    margin: 10px;
`;

const Title = styled.div`
    margin-bottom: 20px;
`;

const AnswerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AnswerInput = styled.input``;

const AnswerBtn = styled.button``;

const Question = ({question}) => {
    return (
        <Container>
            <Title>
                {question.question}
            </Title>
            <AnswerContainer>
                <AnswerInput name={question.question} type="text" />
                <AnswerBtn>제출</AnswerBtn>
            </AnswerContainer>
        </Container>
    );
  }
  
  export default Question;
  