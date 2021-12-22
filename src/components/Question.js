import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { dbService, firebaseInstance } from "../fBase";
import { v4 as uuidv4} from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    padding: 20px;
    box-sizing: border-box;
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
    line-height: 25px;
    justify-content: center;
    align-items: center;
    text-align: center;
    word-break: keep-all;
    font-family: Jeju Myeongjo;
    font-size: 0.8rem;
    :hover {
        cursor: pointer;
    }
`;

const AnswerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    width: 80%;
`;

const AnswerInput = styled.input`
    padding: 4px 7px;
    transition: 0.3s all ease-in-out;
    font-family: Jeju Myeongjo;
    :focus {
      border-radius: 10px;
    }    
`;

const AnswerTextarea = styled.textarea`
    width: 100%;
    min-height: 100px;
    font-family: Jeju Myeongjo;
    padding: 5px;
    line-height: 160%;
`;

const PrivateLabel = styled.label`
    transition: 0.3s all ease-in-out;
    font-size: 0.7rem;
    margin-right: 5px;
`;

const AnswerBtn = styled.div`
    margin-left: 5px;
    width: 20px;
    height: 20px;
    transition: all 0.5s ease-in-out;
    :hover {
        cursor: pointer;
        color: var(--gold);
    }
    :active {
        background-color: var(--main-color);
        transform: scale(0.9);
    }
`;

const Question = ({userObj, question, answerCount}) => {
    const history = useHistory();
    const [isPrivate, setIsPrivate] = useState(false);
    const [answer, setAnswer] = useState('');
    const [longAnswer, setLongAnswer] = useState(false);

    const onClickQuestion = (e) => {
        history.push({
            pathname: `/question/${e.target.getAttribute('name')}`,
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (answer) {
            const answerId = uuidv4();
            const answerObj = {
            question: question.question,
            questionId: question.questionId,
            userId: userObj.uid,
            userName: userObj.displayName,
            answerId,
            answer,
            createdAt: Date.now(),
            editedAt: null,
            isPrivate,
            index: answerCount + 1,
        }
        dbService.collection("answers").doc(`${answerId}`).set(answerObj).then(async () => {
            await dbService.collection("main").doc("counts").update({
                answers: firebaseInstance.firestore.FieldValue.increment(1)
            })
            alert("답변이 저장되었습니다 :)")
        }
        ).catch((error) => {
            console.error("Submit Error : ", error)
        });
        setAnswer("");}
    }

    const onChange = (e) => {
        const answerValue = e.target.value
        setAnswer(answerValue)
    }

    const onChangeCheckbox = () => {
        setIsPrivate(!isPrivate)
    }

    const onChangeAnswerType = () => {
        setLongAnswer(!longAnswer)
    }

    return (
        <Container>
            <Title onClick={onClickQuestion} name={question.questionId}>
                {question.question}
            </Title>
            <AnswerContainer>
                {longAnswer 
                ? ( <AnswerTextarea onChange={onChange} value={answer} name={question.question} autoFocus />
                ) : (
                <AnswerInput onChange={onChange} value={answer} name={question.question} type="text" />
                )}
                <AnswerBtn onClick={onSubmit}>
                    <FontAwesomeIcon icon={faSave} />
                </AnswerBtn>
            </AnswerContainer>
            <AnswerContainer style={{marginBottom: "0"}}>
                <AnswerInput onChange={onChangeAnswerType} type="checkbox"/>
                <PrivateLabel>길게 쓰기</PrivateLabel>
                <AnswerInput onChange={onChangeCheckbox} type="checkbox" />
                <PrivateLabel>답변 비공개하기</PrivateLabel>
            </AnswerContainer>
        </Container>
    );
  }
  
  export default Question;
  