import React from "react";
import { useEffect } from "react/cjs/react.development";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import Answer from "../components/Answer";
import { authService, dbService } from "../fBase";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ProfileContainer = styled.div`
    width: 100%;
    height: 150px;
    background-color: rgba(255,255,255,0.7);
    margin-bottom: 20px;
`;

const Title = styled.div`
    margin: 20px;
    display: flex;
    color: white;
    font-size: 25px;
    font-family: Kyobo Handwriting;
    flex-direction: column;

`;

const LogOutBtn = styled.button``;

const MyAnswers = ({userObj}) => {
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

    const onLogOut = (e) => {
        e.preventDefault();
        authService.signOut();
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
                    나의 답변들
                </Title>
                <ProfileContainer>

                </ProfileContainer>
                <LogOutBtn onClick={onLogOut}>LogOut</LogOutBtn>
                {myAnswers.map(myAnswer => <Answer answer={myAnswer} />)}
            </>
            )}
        </Container>
    );
  }
  
  export default MyAnswers;
  