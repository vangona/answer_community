import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Answer from "../components/Answer";
import Cheer from "../components/Cheer";
import { dbService } from "../fBase";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--main-color);
`;

const AddBtn = styled.button``;

const ModalBackground = styled.div`
background-color: rgba(0,0,0,0.5);
position: absolute;
box-sizing: border-box;
  width: 100vw;
  height: 100vh;
`;

const Home = () => {
  const [isLoading, setISLoading] = useState(true);
  const [cheerList, setCheerList] = useState([]);
  const [randNum, setRandNum] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)

  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(0, currentPage * 5)
    return currentPosts
  }

  const getRandNum = () => {
    const number = Math.floor(Math.random() * 5);
    setRandNum(number)
  }

  const getData = async () => {
    await dbService.collection("cheers").get()
    .then(snapShot => {
      const cheerArray = snapShot.docs.map(doc => ({
        id: doc.cheerId,
        ...doc.data()
    }))
    setCheerList(cheerArray)
    })

    await dbService.collection("answers").onSnapshot(snapshot => {
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
    getRandNum();
  }, [])

    return (
      <Container>
        {isLoading ? "Loading..." 
        : (
          <>
            {cheerList && <Cheer key={cheerList[randNum].cheerId} cheer={cheerList[randNum]} />}
            {answers && currentPosts(answers).map(answer => (
              <Answer key={answer.answerId} answer={answer} />
            ))
            }
          </>
        )
        }
        {currentPosts(answers) > 5 && <AddBtn onClick={addBtn}></AddBtn>}
      </Container>
    );
  }
  
  export default Home;
  