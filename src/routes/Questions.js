import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Question from "../components/Question";
import Search from "../components/Search";
import { dbService } from "../fBase";

const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 130px;
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

const Questions = ({userObj}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [questions, setQuestions] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [currentPage, setCurrentPage] = useState(1)

    const currentPosts = (posts) => {
      let currentPosts = 0;
      currentPosts = posts.slice(0, currentPage * 5)
      return currentPosts
    }
  
    const getQuestions = async () => {
        await dbService.collection("questions").get()
        .then(querySnapshot => {
            const questionArray = querySnapshot.docs.map(doc => ({
                id: doc.questionId,
                ...doc.data()
            }))
            setQuestions(questionArray)
            setIsLoading(!isLoading)
        })
    }

    const addPage = e => {
        setCurrentPage(currentPage + 1)
    }

    useEffect(() => {
        getQuestions();
    }, [])

    return (
        <Container>
            {isLoading
            ? "Loading..." 
            : (
            <>
                { currentPosts(questions.filter(question => question.question.includes(searchWord))).map(question => <Question key={question.questionId} userObj={userObj} question={question} /> )}
                <Search searchWord={searchWord} setSearchWord={setSearchWord} />
                <AddBtn onClick={addPage}>
                    <FontAwesomeIcon icon={faPlusCircle} size="3x" />
                </AddBtn>
            </>
            )}
        </Container>
    );
  }
  
  export default Questions;
  