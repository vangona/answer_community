import React, { useState } from "react";
import styled from "styled-components";
import { authService, dbService } from "../fBase";
import { v4 as uuidv4} from "uuid";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    color: white;
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

const CodeContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CodeBtn = styled.button``;

const CodeDiv = styled.div`
    margin-top: 10px;
`;

const QuestionRegister = () => {
    const [questionName, setQuestionName] = useState('');
    const [code, setCode] = useState("");

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

    const makeCode = async (e) => {
        e.preventDefault();

        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
        const stringLength = 6
        let randomstring = ''
        for (let i = 0; i < stringLength; i++) {
            const rnum = Math.floor(Math.random() * chars.length)
            randomstring += chars.substring(rnum, rnum + 1)
        }

        await authService.createUserWithEmailAndPassword(
            `${randomstring}@drawer.book`, 
            `${randomstring}@drawer.book`)
        .then(async (data) => {
            const newUserObj = {
                uid: data.user.uid,
                displayName: "익명",
                isPassword: false,
                initCode: `${randomstring}@drawer.book`,
                friends: [],
                token: "",
            }
            await dbService.collection("users").doc(`${data.user.uid}`).set(newUserObj).then(alert("성공했습니다."))
        })
        setCode(`${randomstring}@drawer.book`)
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
            <CodeContainer>
                <QuestionName>
                    코드 생성기
                </QuestionName>
                <CodeBtn onClick={makeCode}>생성하기</CodeBtn>
                <CodeDiv>{code && code}</CodeDiv>
            </CodeContainer>
        </Container>
    );
}
  
export default QuestionRegister;
  