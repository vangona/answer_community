import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { dbService } from "../fBase";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 200px;
    border: 1px solid black;
    box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.75);
    -webkit-box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.75);
    color: white;
    border-radius: 10px;
    background-color: var(--main-color);
    margin: 10px;
    :focus-within {
        color: var(--gold);
    }
`;

const Title = styled.div`
    display: flex;
    transition: 0.3s all ease-in-out;
    margin-bottom: 20px;
    width: 80%;
    line-height: 25px;
    justify-content: center;
    align-items: center;
    text-align: center;
    word-break: keep-all;
    font-family: Jeju Myeongjo;
    :hover {
        cursor: pointer;
    }
`;

const AnswerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
`;

const AnswerInput = styled.input`
    transition: 0.3s all ease-in-out;
    :focus {
      border-radius: 10px;
    }    
`;

const PrivateLabel = styled.label`
    transition: 0.3s all ease-in-out;
    font-size: 10px;
`;

const AnswerBtn = styled.button`
    margin: 0;
    margin-left: 1px;
    padding: 3px 7px;
    border-end-end-radius: 10px;
    border-start-end-radius: 10px;
    background-color: rgba(255,255,255);
    font-family: Jeju Myeongjo;
    :active {
        background-color: var(--main-color);
        transform: scale(0.98);
    }
`;

const Question = ({question}) => {
    const history = useHistory();
    const [isPrivate, setIsPrivate] = useState(false);
    const [answer, setAnswer] = useState('');

    const onClickQuestion = (e) => {
        history.push({
            pathname: `/question/${e.target.getAttribute('name')}`,
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

    const onChange = (e) => {
        setAnswer(e.target.value)
    }

    const onChangeCheckbox = (e) => {
        setIsPrivate(!isPrivate)
    }

    return (
        <Container>
            <Title onClick={onClickQuestion} name={question.questionId}>
                {question.question}
            </Title>
            <AnswerContainer>
                <AnswerInput onChange={onChange} value={answer} name={question.question} type="text" />
                <AnswerBtn onClick={onSubmit}>답변</AnswerBtn>
            </AnswerContainer>
            <AnswerContainer style={{marginBottom: "0"}}>
                <AnswerInput onChange={onChangeCheckbox} type="checkbox" />
                <PrivateLabel>답변 비공개하기</PrivateLabel>
            </AnswerContainer>
        </Container>
    );
  }
  
  export default Question;
  