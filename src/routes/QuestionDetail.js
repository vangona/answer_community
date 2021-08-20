import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Question from "../components/Question";
import { dbService } from "../fBase";

const Container = styled.div`
  padding-top: 30px;
`;

const QuestionDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const questionID = useParams().id;
  const getQuestion = async () => {
    await dbService.collection("questions").where("questionId", "==", `${questionID}`).get()
    .then(snapShot => {
      const questionData = snapShot.docs.map(doc => ({
        ...doc.data()
      }))
      setQuestion(questionData)
      setIsLoading(false);
    }
    )
  }

  useEffect(() => {
    getQuestion();
  })

  return (
    <Container>
      {isLoading ? "Loading..."
      : <Question question={question[0]} />
      }
    </Container>
  );
  }

  export default QuestionDetail;
    