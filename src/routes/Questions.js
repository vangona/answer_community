import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "../components/Loading";
import Question from "../components/Question";
import Search from "../components/Search";

const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
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

const LastQuestion = styled.div`
    color: white;
    font-size: 12px;
    padding: 15px 0;
`;

const Questions = ({questionArray, userObj}) => {
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
    //     await dbService.collection("questions").get()
    //     .then(querySnapshot => {
    //         const questionArray = querySnapshot.docs.map(doc => ({
    //             id: doc.questionId,
    //             ...doc.data()
    //         }))
            setQuestions(questionArray.sort(() => Math.random() - 0.5))
            setIsLoading(!isLoading)
    //     })
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
            ? <Loading />
            : (
            <>
                {currentPosts(questions.filter(question => question.question.includes(searchWord))).map(question => <Question key={question.questionId} userObj={userObj} question={question} /> )}
                <Search searchWord={searchWord} setSearchWord={setSearchWord} />
                {currentPage*5 <= questions.length 
                ?
                <AddBtn onClick={addPage}>
                    <FontAwesomeIcon icon={faPlusCircle} size="2x" />
                </AddBtn>
                : <LastQuestion>
                    마지막 질문입니다.
                </LastQuestion>
                }
            </>
            )}
        </Container>
    );
  }
  
  export default Questions;
  