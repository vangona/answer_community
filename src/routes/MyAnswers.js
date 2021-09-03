import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyAnswer from "../components/MyAnswer";
import { dbService } from "../fBase";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 90vh;
    width: 100%;
    margin-top: 30px;
`;

const Title = styled.div`
    margin: 20px;
    display: flex;
    color: white;
    font-size: 25px;
    font-family: Kyobo Handwriting;
    flex-direction: column;
`;

const MyAnswers = ({questionArray, userObj}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [myAnswers, setMyAnswers] = useState(null);

    const getMyAnswers = async () => {
        await dbService.collection("answers").where("userId", "==", `${userObj.uid}`).get()
        .then(snapshot => {
            const myAnswerArray = snapshot.docs.map(doc => ({
                id: doc.answerId,
                ...doc.data()    
            }))
            setMyAnswers(myAnswerArray)
            setIsLoading(!isLoading)
        })
    }

    useEffect(()=>{
        getMyAnswers();
    }, [])

    return (
        <Container>
            {isLoading 
            ? "Loading..."
            : ( 
            <>
                <Title>
                    나의 대답들
                </Title>
                {myAnswers.map(myAnswer => <MyAnswer key={myAnswer.answerId} questionArray={questionArray} answer={myAnswer} />)}
            </>
            )}
        </Container>
    );
  }
  
  export default MyAnswers;
  