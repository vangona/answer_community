import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Answer from "../components/Answer";
import Comment from "../components/comment/Comment";
import Loading from "../components/Loading";
import { dbService } from "../fBase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  margin-top: 50px;
`;

const Title = styled.h1`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const NotesConatiner = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.9rem;
  margin: 10px;
`;

const BackBtn = styled.button`
  display: flex;
  position: fixed;
  bottom: 30px;
  left: 20px;
  border: none;
  background: none;
  color: white;
  font-size: 1rem;
  transition: all 0.5s ease-in-out;
  :hover {
    cursor: pointer;
    color: var(--gold);
  }
`;

const AnswerDetail = ({userObj, refreshFriends, refreshBookmarks}) => {
  const history = useHistory();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [answer, setAnswer] = useState('');
  const [notes, setNotes] = useState('');

  const getNotes = async () => {
    dbService.collection("notes").where("answerId", "==", id).onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      data.sort((a ,b) => 
        b.createdAt - a.createdAt
      )
      setNotes(data);
    })
    setIsLoading(false)
  }

  const getAnswer = async () => {
    await dbService.collection("answers").where("answerId", "==", `${id}`).get().then(querySnapshot => {
       const data = querySnapshot.docs.map(doc => doc.data());
       setAnswer(...data);
      }).catch(error => {
        console.log("error", error)
      })
      getNotes();
    }

    useEffect(() => {
      getAnswer();
    }, [])

    return (
      <Container>
        {isLoading 
        ? <Loading />
        :
        <>
          <Title>
            {answer.answer.slice(0,9)}{answer.answer.length > 9 ? "..." : ""}
          </Title>
          <Answer answer={answer} userObj={userObj} refreshFriends={refreshFriends} refreshBookmarks={refreshBookmarks} />
          <NotesConatiner>
            {notes.length !== 0 
            ?
            notes.map(note => <Comment key={note.noteId} userObj={userObj} note={note} />)
            : "아직 남겨진 쪽지가 없습니다."
            }
          </NotesConatiner>
          <BackBtn onClick={() => {history.goBack()}}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </BackBtn>
        </>
        }
      </Container>
    );
  }
  
  export default AnswerDetail;
  