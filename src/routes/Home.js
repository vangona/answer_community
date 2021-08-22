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

const Home = () => {
  const [isLoading, setISLoading] = useState(true);
  const [cheerList, setCheerList] = useState([]);
  const [randNum, setRandNum] = useState(null);
  const [answers, setAnswers] = useState([]);

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

  useEffect(() => {
    getData();
    getRandNum();
  }, [])

    return (
      <Container>
        {isLoading ? "Loading..." 
        : (
          <>
            {cheerList && <Cheer cheer={cheerList[randNum]} />}
            {answers && answers.map(answer => (
              <Answer answer={answer} />
            ))
            }
          </>
        )
        }
      </Container>
    );
  }
  
  export default Home;
  