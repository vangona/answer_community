import { faDice, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Answer from "components/answer/Answer";
import Cheer from "components/auth/Cheer";
import Loading from "components/loading/Loading";
import { dbService } from "utils/fBase";
import useScrollMove from "components/hooks/useScrollMove";
import _ from "lodash";

const Container = styled.div`
  padding: 40px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--main-color);
`;

const RandomBtn = styled.button`
  margin-bottom: 10px;
  font-size: 0.8rem;
  border-radius: 15px;
  padding: 5px 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  background-color: transparent;
  font-family: Kyobo Handwriting;
  transition: 0.5s all ease-in-out;
  :hover {
    cursor: pointer;
    border: 1px solid var(--gold);
    color: var(--gold);
  }
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
  font-size: 0.8rem;
  padding: 15px 0;
`;

const DiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Dice = styled.div``;

const Notice = styled.span`
  font-size: 0.8rem;
  display: flex;
  font-family: Kyobo Handwriting;
`;

const DotBlink = keyframes`
    0% {
        opacity: 0%;
    }
    20% {
        opacity: 0%;
    }
    40% {
        opacity: 100%;
    }
    60% {
        opacity: 100%;
    }
    80% {
        opacity: 100%;
    }
    100% {
        opacity: 100%
    }
`;

const Dot = styled.div`
  animation: ${DotBlink} 0.9s infinite;
  :nth-child(2) {
    animation-delay: 0.3s;
  }
  :last-child {
    animation-delay: 6s;
  }
`;

const Home = ({ userObj, refreshFriends, refreshBookmarks, answerCount }) => {
  const prevAnswers = JSON.parse(sessionStorage.getItem("drawer_prevData"));
  const prevPage = sessionStorage.getItem("drawer_prevPage");

  const history = useHistory();
  const match = useRouteMatch();
  const [isLoading, setISLoading] = useState(true);
  const [answers, setAnswers] = useState(prevAnswers ? prevAnswers : []);
  const [currentPage, setCurrentPage] = useState(prevPage ? prevPage : 1);
  const [diceState, setDiceState] = useState(false);
  const [randomState, setRandomState] = useState(false);

  const { scrollInfos, scrollRemove } = useScrollMove({
    page: `home`,
    path: `/`,
  });

  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(0, currentPage * 5);
    return currentPosts;
  };

  const makeRandArray = () => {
    let randArray = [];
    for (let i = 0; i < 5; i++) {
      randArray[i] = Math.floor(Math.random() * answerCount);
      for (let l = 0; l < i; l++) {
        if (randArray[i] === randArray[l]) {
          i--;
          break;
        }
      }
    }
    return randArray;
  };

  const getData = async () => {
    if (randomState) {
      setDiceState(true);
      const randArray = makeRandArray();
      dbService
        .collection("answers")
        .where("isPrivate", "==", false)
        .where("index", "in", randArray)
        .onSnapshot((snapshot) => {
          const answerArray = snapshot.docs.map((doc) => ({
            id: doc.answerId,
            ...doc.data(),
          }));
          answerArray.sort((a, b) => {
            if (a.createdAt > b.createdAt) return -1;
            if (a.createdAt === b.createdAt) return 0;
            if (a.createdAt < b.createdAt) return 1;
          });
          setAnswers(answerArray);
          if (isLoading) {
            setISLoading(false);
          }
        });
      setDiceState(false);
    } else {
      dbService
        .collection("answers")
        .where("isPrivate", "==", false)
        .orderBy("createdAt")
        .limitToLast(currentPage * 5 + 10)
        .get()
        .then((snapshot) => {
          const answerArray = snapshot.docs.map((doc) => ({
            id: doc.answerId,
            ...doc.data(),
          }));
          answerArray.sort((a, b) => {
            if (a.createdAt > b.createdAt) return -1;
            if (a.createdAt === b.createdAt) return 0;
            if (a.createdAt < b.createdAt) return 1;
          });
          sessionStorage.setItem("drawer_prevData", JSON.stringify(answerArray));
          setAnswers(answerArray);
          if (isLoading) {
            setISLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onClickAddBtn = () => {
    // 페이지가 바로 로딩될 수 있도록,
    // 미리 10개씩 불러두었다가, 사용함.
    // 비축분이 적어지면, 그때 getData를 통해서 Data를 불러옴.
    if ((currentPage * 5 >= answers.length) | randomState) {
      getData();
    }

    if (!randomState) {
      setCurrentPage(currentPage + 1);
      sessionStorage.setItem("drawer_prevPage", currentPage * 1 + 1);
    }
  };

  const onToggleRandom = () => {
    setRandomState(!randomState);
  };

  useEffect(() => {
    if (userObj.isFirst) {
      history.push("/manual");
    }

    if (prevAnswers) {
      setISLoading(false);
    } else {
      getData();
    }

    if (scrollInfos && match?.isExact) {
      window.scrollTo(0, scrollInfos);
      const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      if (scrollTop === scrollInfos) {
        scrollRemove();
      }
    }
  }, [randomState, scrollInfos, scrollRemove, match, isLoading]);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Cheer />
          <RandomBtn onClick={onToggleRandom}>{randomState ? "시간 순서대로 보기" : "랜덤으로 보기"}</RandomBtn>
          {answers &&
            currentPosts(answers).map((answer) => (
              <Answer
                key={answer.answerId}
                userObj={userObj}
                answer={answer}
                refreshFriends={refreshFriends}
                refreshBookmarks={refreshBookmarks}
              />
            ))}
          {(answers.length < 5) | (currentPage * 5 <= answers.length) | randomState ? (
            <AddBtn onClick={_.throttle(onClickAddBtn, 500)}>
              {randomState ? (
                <DiceContainer>
                  <Dice>
                    <FontAwesomeIcon icon={faDice} size="2x" />
                  </Dice>
                  {diceState && (
                    <Notice>
                      주사위 굴리는 중<Dot>.</Dot>
                      <Dot>.</Dot>
                      <Dot>.</Dot>
                    </Notice>
                  )}
                </DiceContainer>
              ) : (
                <FontAwesomeIcon icon={faPlusCircle} size="2x" />
              )}
            </AddBtn>
          ) : (
            <LastAnswer>마지막 대답입니다.</LastAnswer>
          )}
          {/* {randomState && <Search onSearch={onSearch} from="home" searchWord={searchWord} setSearchWord={setSearchWord} />} */}
        </>
      )}
    </Container>
  );
};

export default Home;
