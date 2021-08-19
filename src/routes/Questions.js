import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Question from "../components/Question";
import Search from "../components/Search";
import { dbService } from "../fBase";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Questions = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [questions, setQuestions] = useState([]);
    const [searchWord, setSearchWord] = useState("");

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

    useEffect(() => {
        getQuestions();
    }, [])

    return (
        <>
        {isLoading ? "Loading..."
        : (
            <Container>
                {questions.map(question => (
                    question.question.includes(searchWord) ?
                    <Question question={question}/>
                    : null
                )) }
                <Search searchWord={searchWord} setSearchWord={setSearchWord}/>
            </Container> )
            }
        </>
    );
  }
  
  export default Questions;
  