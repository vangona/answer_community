import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Answer from "components/answer/Answer";
import Loading from "components/loading/Loading";
import { dbService } from "utils/fBase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
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

const QuestionDetail = ({userObj, refreshFriends, refreshBookmarks}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1)

  const currentPosts = (posts) => {
      let currentPosts = 0;
      currentPosts = posts.slice(0, currentPage * 5)
      return currentPosts
    }

    const addPage = () => {
      if (currentPage*5 >= answers.length) {
        getAnswers();
      }
      setCurrentPage(currentPage + 1)
  }

  const getAnswers = async () => {
    await dbService.collection("answers").where("isPrivate", "==", false).where("questionId", "==", `${id}`).orderBy("createdAt").limitToLast(currentPage*5 + 10).get()
    .then(snapShot => {
      const answerData = snapShot.docs.map(doc => ({
        ...doc.data()
      }))
      answerData.sort((a, b) => {
        if(a.createdAt > b.createdAt) return -1;
        if(a.createdAt === b.createdAt) return 0;
        if(a.createdAt < b.createdAt) return 1;
      });
      setAnswers(answerData)
      setIsLoading(false);
    }
    )
  }

  useEffect(() => {
    getAnswers();
  }, [])

  return (
    <Container>
      {isLoading 
      ? <Loading />
      :
      <>
      <Question>{answers[0].question}</Question>
      {currentPosts(answers).map(answer => <Answer answer={answer} userObj={userObj} refreshFriends={refreshFriends} refreshBookmarks={refreshBookmarks} />)}
      {currentPage*5 <= answers.length 
      ?
      <AddBtn onClick={addPage}>
          <FontAwesomeIcon icon={faPlusCircle} size="2x" />
      </AddBtn>
      : <LastAnswer>
          마지막 대답입니다.
      </LastAnswer>
      }
      </>
      }
    </Container>
  );
  }

  export default QuestionDetail;
    