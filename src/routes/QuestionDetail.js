import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Answer from "../components/Answer";
import { dbService } from "../fBase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  padding-top: 30px;
`;

const Question = styled.div`
  font-size: 18px;
  word-break: keep-all;
  text-align: center;
  line-height: 25px;
  width: 70%;
  color: white;
  font-family: Jeju myeongjo;
  margin-bottom: 20px;
`;

const QuestionDetail = ({userObj}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const { id } = useParams();
  
  const getAnswers = async () => {
    await dbService.collection("answers").where("questionId", "==", `${id}`).get()
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
      <Question>{answers[0].question}</Question>
      {answers.map(answer => <Answer answer={answer} userObj={userObj} />)}
      </>
      }
    </Container>
  );
  }

  export default QuestionDetail;
    