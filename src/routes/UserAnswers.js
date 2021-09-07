import React, { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react/cjs/react.development";
import styled from "styled-components";
import Answer from "../components/Answer";
import { dbService } from "../fBase";

const Container = styled.div``;

const Writer = styled.div`
    width: 100%;
    text-align: center;
    font-size: 20px;
    color: white;
    font-family: Jeju myeongjo;
    margin-top: 40px;
    margin-bottom: 30px;
`;

const UserAnswers = ({userObj}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [answers, setAnswers] = useState([]);
    const { id } = useParams();
    
    const getAnswers = async () => {
        await dbService.collection("answers").where("userId", "==", `${id}`).get()
        .then(snapShot => {
          const answerData = snapShot.docs.map(doc => ({
            ...doc.data()
          }))
          setAnswers(answerData)
          setIsLoading(false);
        }
        )
      }
    
      useEffect(() => {
        getAnswers();
      })

    return (
        <Container>
        {isLoading ? "Loading..."
        :
        <>
        <Writer>{answers[0].userName}의 대답들</Writer>
        {answers.map(answer => <Answer answer={answer} userObj={userObj} />)}
        </>
        }
      </Container>
    )
}

export default UserAnswers;