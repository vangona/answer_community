import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Answer from "../components/Answer";
import Cheer from "../components/Cheer";
import { CheerComment } from "../components/DB/CheerDB";
import Loading from "../components/Loading";
import useNotification from "../components/useNotification";
import { authService, dbService } from "../fBase";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--main-color);
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

const Home = ({ userObj, refreshFriends }) => {
  const [isLoading, setISLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)

  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(0, currentPage * 5)
    return currentPosts
  }

  const getData = async () => {
    dbService.collection("answers").onSnapshot(snapshot => {
      const answerArray = snapshot.docs.map(doc => ({
        id:doc.answerId,
        ...doc.data(),
      }));
      answerArray.sort((a, b) => {
        if(a.createdAt > b.createdAt) return -1;
        if(a.createdAt === b.createdAt) return 0;
        if(a.createdAt < b.createdAt) return 1;
      });
      setAnswers(answerArray)
      setISLoading(false)
    });
  };

  const addBtn = e => {
    setCurrentPage(currentPage + 1)
  }

  useEffect(() => {
    getData();
  }, [])

    return (
      <Container>
        {isLoading 
        ? <Loading />
        : (
          <>
            <Cheer />
            {answers && currentPosts(answers).map(answer => (
              <Answer key={answer.answerId} userObj={userObj} answer={answer} refreshFriends={refreshFriends} />
            ))
            }
            {currentPage*5 <= answers.length 
            ? 
            <AddBtn onClick={addBtn}>
              <FontAwesomeIcon icon={faPlusCircle} size="2x" />
            </AddBtn>
            : <LastAnswer>
                    마지막 대답입니다.
            </LastAnswer>
            }
          </>
        )
        }
      </Container>
    );
  }
  
  export default Home;
  