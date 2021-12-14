import React, { useState } from "react";
import styled from "styled-components";
import { MailIcon } from "@heroicons/react/outline"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faBookReader, faPencilAlt, faReply, faTrashAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { dbService, firebaseInstance } from "../fBase";
import NoteFactory from "./NoteFactory";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  padding: 25px 15px 30px 15px;
  box-sizing: border-box;
  border: 1px solid black;
  box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.75);
  -webkit-box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.75);
  color: black;
  border-radius: 3px;
  background-color: white;
  opacity: 70%;
  transition: 0.3s all ease-in-out;
  transform: skewX(-0.5deg);
  :hover {
      cursor: pointer;
      color: var(--main-color);
      transform: skew(0, 0);
      opacity: 95%;
  }
`;

const Question = styled.h1`
  line-height: 20px;
  text-align: center;
  word-break: keep-all;
  transition: 0.3s all ease-in-out;
  font-family: Jeju Myeongjo;
  margin-bottom: 20px;
  font-size: 0.9rem;
  :hover {
    color: var(--gold);
    cursor: pointer;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.1s all ease-in-out;
  color: black;
  position: absolute;
  bottom: 10px;
  right: 15px;
  font-size: 0.8rem;
`;

const CreatedAt = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s all ease-in-out;
  color: black;
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 0.6rem;
`;

const WriterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: black;
`;

const Writer = styled.span`
  transition: 0.3s all ease-in-out;
  text-align: right;
  width: auto;
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 0.7rem;
  :hover {
    color: var(--gold);
    cursor: pointer;
  }
`;

const Content = styled.div`
  text-indent: 5px;
  line-height: 160%;
  background-color: white;
  opacity: inherit;
  border-radius: 10px;
  word-break: keep-all;
  font-family: Jeju Myeongjo;
  width: 100%;
  padding: 15px;
  font-size: 0.8rem;
  color: black;
  box-sizing: border-box;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  color: inherit;
  transition: 0.5s all ease-in-out;
  :hover {
    color: var(--gold);
    cursor: pointer;
  }
`;

const ReplyIcon = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  color: inherit;
  transition: 0.5s all ease-in-out;
  bottom: 10px;
  left: 10px;
  font-size: 0.8rem;
  :hover {
    color: var(--gold);
    cursor: pointer;
  }
`;

const EditInput = styled.textarea`
  line-height: 17px;
  font-size: 0.7rem;
  width: 90%;
  min-height: 100px;
`;

const Answer = ({answer, userObj, refreshFriends, refreshBookmarks}) => {
  const { id } = useParams();
  const [editState, setEditState] = useState(false);
  const [noteState, setNoteState] = useState(false);
  const [changedAnswer, setChangedAnswer] = useState('');
  
  const history = useHistory();

  const Time = new Date(answer.createdAt) 
  const year = Time.getFullYear();
  const month = Time.getMonth() + 1;
  const day = Time.getDate();
  const date = `${year}년 ${month < 10 ? "0"+month : month}월 ${day < 10 ? "0"+day : day}일`
  const lastTime = (Date.now() - answer.createdAt) / 1000 / 60
  const lastMinutes = Math.round(lastTime)
  const lastHours = Math.round(lastTime / 60)
  const lastDays = Math.round(lastHours / 24)

  const onClickEdit = e => {
    e.preventDefault();
    setChangedAnswer(answer.answer)
    if (answer.userId === userObj.uid) {
      setEditState(!editState);
      if(changedAnswer !== answer.answer & editState === true) {
        window.confirm("내용을 수정하시겠어요?") 
        && dbService.collection("answers").doc(answer.answerId).update({
          answer: changedAnswer,
          editedAt: Date.now()
        }) 
      }
    }
  }

  const onClickDelete = e => {
    e.preventDefault();
    if (answer.userId === userObj.uid) {
      window.confirm("정말 지우실건가요?") && 
      dbService.collection("answers").doc(answer.answerId).delete().then(() => {
        dbService.collection("main").doc("counts").update({
          answers: firebaseInstance.firestore.FieldValue.increment(-1)
        })
      })
    }
  }

  const onClicekFriend = async (answer) => {
    await dbService.collection("users").doc(`${userObj.uid}`).update({
      friends: [...userObj.friends, answer.userId]
    })
    .then(() => {
      refreshFriends([...userObj.friends, answer.userId])
      alert(`${answer.userName}님을 서랍장에 추가했습니다.`)
    })
  }
  
  const onClickNote = e => {
    e.preventDefault();
    setNoteState(!noteState);
  }

  const onClickBookmark = async (e) => {
    e.preventDefault();
    await dbService.collection("users").doc(`${userObj.uid}`).update({
      bookmarks: [...userObj.bookmarks, answer.answerId]
    })
    .then(() => {
      refreshBookmarks([...userObj.bookmarks, answer.answerId])
    })    
  }

  const onDeleteBookmark = async (e) => {
    e.preventDefault();
    window.confirm('책갈피를 빼시겠어요?') &&
    await dbService.collection("users").doc(`${userObj.uid}`).update({
      bookmarks: [...userObj.bookmarks.filter((el) => el !== answer.answerId)],
    })
    .then(() => {
      refreshBookmarks([...userObj.bookmarks.filter((el) => el !== answer.answerId)])
    })       
  }

  const onClickDetail = e => {
    e.preventDefault();
    history.push(`/question/${answer.questionId}`)
  }

  const onClickUser = e => {
    e.preventDefault();
    history.push(`/useranswer/${answer.userId}`)
  }

  const onChange = e => {
    setChangedAnswer(e.target.value)
  }

  const onClickAnswer = e => {
    if (id) {
      if (id !== answer.answerId) {
        history.push(`/answer/${answer.answerId}`)
      }
    } else {
      history.push(`/answer/${answer.answerId}`)
    }
  }

  return (
    <Container onClick={onClickAnswer} style={{margin: `${Math.random() * 10 + 7}px` ,left: `${Math.random() * 8 - 4}%`}}>
      <Question onClick={onClickDetail}>{answer.question}</Question>
      <InfoContainer>
        {answer.userId === userObj.uid 
        ? (
        <>
          <IconBox onClick={onClickEdit}>
            <FontAwesomeIcon style={{marginLeft: "5px"}} icon={faPencilAlt} />
          </IconBox>
          <IconBox onClick={onClickDelete}>
            <FontAwesomeIcon style={{marginLeft: "5px"}} icon={faTrashAlt} />
          </IconBox>
        </>
          )
        : (
          <>
            {userObj.friends && !userObj.friends.includes(answer.userId) && 
            <IconBox>
              <FontAwesomeIcon onClick={() => {
                onClicekFriend(answer)
              }} icon={faUserPlus} />
            </IconBox>
            }
            {userObj.bookmarks && userObj.bookmarks.includes(answer.answerId)
            ? 
            <IconBox onClick={onDeleteBookmark}>
              <FontAwesomeIcon icon={faBookReader} />
            </IconBox>
            :
            <IconBox onClick={onClickBookmark}>
              <FontAwesomeIcon icon={faBookOpen} />
            </IconBox>
            }
          </>
        )}
      </InfoContainer>
      <ReplyIcon onClick={onClickNote}>
        <FontAwesomeIcon icon={faReply} style={{ transform: 'rotate(180deg)' }} />
        {/* <MailIcon style={{width: "15px", marginLeft: "5px"}} /> */}
      </ReplyIcon>
      <CreatedAt>
        {lastMinutes < 60 
        ? `${lastMinutes}분 전` 
        : lastHours < 24 
          ? `${lastHours}시간 전`
          : lastDays > 7
            ? `${date}`
            : `${lastDays}일 전`
        }
        {answer.editedAt && "(수정됨)"}
      </CreatedAt>
      <WriterContainer>
        <Writer onClick={onClickUser}>- {answer.userName}{answer.isPrivate && " (나에게만 보임)"}</Writer>
      </WriterContainer>
      <Content>
        {editState 
        ? <EditInput autoFocus onChange={onChange} value={changedAnswer} />
        : answer.answer}
      </Content>
      {noteState && <NoteFactory userObj={userObj} answer={answer} setNoteState={setNoteState} />}
    </Container>
  );
}

export default Answer;
  