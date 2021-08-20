import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Cheer from "../components/Cheer";
import { dbService } from "../fBase";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Home = () => {
  const [isLoading, setISLoading] = useState(true);
  const [cheerList, setCheerList] = useState([]);
  const [randNum, setRandNum] = useState(null);

  const getCheers = async () => {
    await dbService.collection("cheers").get()
    .then(snapShot => {
      const cheerArray = snapShot.docs.map(doc => ({
        id: doc.cheerId,
        ...doc.data()
    }))
    setCheerList(cheerArray)
    setISLoading(false)
    })
  }

  const getRandNum = () => {
    const number = Math.floor(Math.random() * 5);
    setRandNum(number)
  }

  useEffect(() => {
    getCheers();
    getRandNum();
  }, [])

    return (
      <Container>
        {isLoading ? "Loading..." 
        : (
          <>
            {cheerList && <Cheer cheer={cheerList[randNum]} />}
          </>
        )
        }
      </Container>
    );
  }
  
  export default Home;
  