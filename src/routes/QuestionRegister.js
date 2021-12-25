import React, { useEffect, useState } from "react";
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

const QuestionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
`;

const CheerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
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

const CheerName = styled.h3`
    margin-bottom: 20px;
    font-size: 18px;
`;

const CheerForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CheerInput = styled.input`
`;

const CodeContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CodeInput = styled.input``;

const CodeBtn = styled.button``;

const CodeDiv = styled.div`
    margin-top: 10px;
`;

const QuestionRegister = ({userObj}) => {
    const [questionName, setQuestionName] = useState('');
    const [cheerName, setCheerName] = useState('');
    const [code, setCode] = useState("");
    const [specific, setSpecific] = useState('');

    const onChange = (e) => {
        setQuestionName(e.target.value);
    }

    const onChangeCode = e => {
        setSpecific(e.target.value);
    }

    const onChangeCheer = (e) => {
        setCheerName(e.target.value)
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

    const onSubmitCheer = async (e) => {
        e.preventDefault();
        if (cheerName) {
            const cheerId = uuidv4();
            const cheer = cheerName;
            const cheerObj = {
                cheer,
                cheerId,
            }
            await dbService.collection("cheers").doc(cheerName).set(cheerObj)
            setCheerName("");
        }
    }

    const makeCode = async (e) => {
        e.preventDefault();

        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
        const stringLength = 6
        let randomstring = ''

        if (specific) {
            randomstring = specific;
        } else {
            for (let i = 0; i < stringLength; i++) {
                const rnum = Math.floor(Math.random() * chars.length)
                randomstring += chars.substring(rnum, rnum + 1)
            }
        };

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
                bookmarks: [],
                token: "",  
                isFirst: true,
            }
            
            await data.user.updateProfile({
                displayName: "익명",
            })

            await dbService.collection("users").doc(`${data.user.uid}`).set(newUserObj)
            .then(() => {
                alert("성공했습니다.")
            })
        })
        setCode(`${randomstring}@drawer.book`)
    }

    useEffect(() => {
        if (userObj.uid !== "oaQ2Ruq5mVZbFDb9t5E2fukKhox2") {
            authService.signOut();
        };
    }, []);

    return (
        <Container>
            <QuestionContainer>
                <QuestionName>
                    무슨 질문을 추가하실 건가요?
                </QuestionName>
                <QuestionForm>
                    <QuestionInput onChange={onChange} value={questionName} type="text" />
                    <Submit onClick={onSubmit}>추가하기</Submit>
                </QuestionForm>
            </QuestionContainer>
            <CheerContainer>
                <CheerName>
                    무슨 응원을 추가하실 건가요?
                </CheerName>
                <CheerForm>
                    <CheerInput onChange={onChangeCheer} value={cheerName} type="text" />
                    <Submit onClick={onSubmitCheer}>추가하기</Submit>
                </CheerForm>
            </CheerContainer>
            <CodeContainer>
                <QuestionName>
                    코드 생성기
                </QuestionName>
                <CodeInput onChange={onChangeCode} value={specific} type="text"/>
                <CodeBtn onClick={makeCode}>생성하기</CodeBtn>
                <CodeDiv>{code && code}</CodeDiv>
            </CodeContainer>
        </Container>
    );
}
  
export default QuestionRegister;
  