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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 150px;
    background-color: rgba(255,255,255,0.7);
    margin-bottom: 20px;
`;

const DisplaynameInput = styled.input``;

const ProfileSubmitBtn = styled.button``;

const Title = styled.div`
    margin: 20px;
    display: flex;
    color: white;
    font-size: 25px;
    font-family: Kyobo Handwriting;
    flex-direction: column;

`;

const LogOutBtn = styled.button``;

const MyAnswers = ({ refreshUser ,userObj}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [myAnswers, setMyAnswers] = useState(null);
    const [displayName, setDisplayName] = useState("");

    const onChange = e => {
        setDisplayName(e.target.value)
    }

    const onSubmit = async (e) => {
        if (userObj.displayname !== displayName) {
            await userObj.updateProfile({
                displayName
            });
            refreshUser();
            setDisplayName("");
        };
    };

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
                    {userObj.displayName}의 답변들
                </Title>
                <ProfileContainer>
                    <DisplaynameInput onChange={onChange} value={displayName} type="text" />
                    <ProfileSubmitBtn onClick={onSubmit}>변경</ProfileSubmitBtn>
                </ProfileContainer>
                <LogOutBtn onClick={onLogOut}>LogOut</LogOutBtn>
                {myAnswers.map(myAnswer => <Answer answer={myAnswer} />)}
            </>
            )}
        </Container>
    );
  }
  
  export default MyAnswers;
  