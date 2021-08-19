import React, { useState } from "react";
import styled from "styled-components";
import { dbService } from "../fBase";
import { v4 as uuidv4} from "uuid";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

const QuestionName = styled.h3`
    margin-bottom: 20px;
    font-size: 18px;
`;

const QuestionForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const QuestionInput = styled.input`
`;

const Submit = styled.button`
`;

const QuestionRegister = () => {
    const [questionName, setQuestionName] = useState('');

    const onChange = (e) => {
        setQuestionName(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (questionName) {
            const questionId = uuidv4();
            const question = questionName;
            const questionObj = {
                question,
                questionId,
                answerUsers: [],
                publicAnswer: [],
            }
            await dbService.collection("questions").doc(question).set(questionObj)
            setQuestionName("");
        }
    }

    return (
        <Container>
            <QuestionName>
                무슨 질문을 추가하실 건가요?
            </QuestionName>
            <QuestionForm>
                <QuestionInput onChange={onChange} value={questionName} type="text" />
                <Submit onClick={onSubmit}>추가하기</Submit>
            </QuestionForm>
        </Container>
    );
}
  
export default QuestionRegister;
  