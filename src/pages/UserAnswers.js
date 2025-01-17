import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Answer from "components/answer/Answer";
import Loading from "components/loading/Loading";
import ProfileBio from "components/settings/ProfileBio";
import { dbService } from "utils/fBase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Writer = styled.div`
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
    color: white;
    font-family: Jeju myeongjo;
    margin-top: 50px;
    margin-bottom: 40px;
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
    font-size: 0.7rem;
    padding: 15px 0;
`;

const UserAnswers = ({userObj, refreshFriends, refreshBookmarks}) => {
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
        await dbService.collection("answers").where("isPrivate", "==", false).where("userId", "==", `${id}`).orderBy("createdAt").limitToLast(currentPage*5 + 10).get()
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
        <Writer>{answers[0].userName}의 대답들</Writer>
        <ProfileBio userObj={userObj} refreshBio='' isProfile={false} />
        {currentPosts(answers).map((answer, index) => <Answer key={index} answer={answer} userObj={userObj} refreshFriends={refreshFriends} refreshBookmarks={refreshBookmarks} />)}
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
    )
}

export default UserAnswers;