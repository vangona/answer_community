import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const AddBtn = styled.button`
    background-color: transparent;
    border: 0;
    color: white;
    opacity: 0.7;
    margin: 15px;
    :hover {
        cursor: pointer;
    }
    :active {
        transform: scale(0.98);
    }
`;

const MyAnswers = ({questionArray, userObj}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [myAnswers, setMyAnswers] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)

    const currentPosts = (posts) => {
        let currentPosts = 0;
        currentPosts = posts.slice(0, currentPage * 5)
        return currentPosts
      }

      const addPage = e => {
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
                {currentPosts(myAnswers).map(myAnswer => <MyAnswer key={myAnswer.answerId} questionArray={questionArray} answer={myAnswer} />)}
                <AddBtn onClick={addPage}>
                    <FontAwesomeIcon icon={faPlusCircle} size="3x" />
                </AddBtn>
            </>
            )}
        </Container>
    );
  }
  
  export default MyAnswers;
  