import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Answer from "../components/Answer";
import { dbService } from "../fBase";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 90vh;
    width: 100%;
    margin-top: 30px;
    box-sizing: border-box;
`;

const Title = styled.div`
    margin: 20px;
    display: flex;
    color: white;
    font-size: 25px;
    font-family: Kyobo Handwriting;
    flex-direction: column;
`;

const AddBtn = styled.button`
    background-color: transparent;
    border: 0;
    color: white;
    opacity: 0.7;
    padding: 15px 0;
    :hover {
        cursor: pointer;
    }
    :active {
        transform: scale(0.98);
    }
`;

const LastAnswer = styled.div`
    color: white;
    font-size: 12px;
    padding: 15px 0;
`;

const MyAnswers = ({userObj}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [myAnswers, setMyAnswers] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)

    const currentPosts = (posts) => {
        let currentPosts = 0;
        currentPosts = posts.slice(0, currentPage * 5)
        return currentPosts
      }

      const addPage = () => {
        setCurrentPage(currentPage + 1)
    }

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
                {currentPosts(myAnswers).map(myAnswer => <Answer key={myAnswer.answerId} answer={myAnswer} userObj={userObj}/>)}
                {currentPage*5 <= myAnswers.length 
                ?
                <AddBtn onClick={addPage}>
                    <FontAwesomeIcon icon={faPlusCircle} size="2x" />
                </AddBtn>
                : <LastAnswer>
                    마지막 대답입니다.
                </LastAnswer>
                }
            </>
            )}
        </Container>
    );
  }
  
  export default MyAnswers;
  