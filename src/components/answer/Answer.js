import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faBookOpen, faBookReader,  faPencilAlt, faReply, faSave, faTrashAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import FriendBtn from 'components/answer/FriendBtn';
import BookmarkBtn from 'components/answer/BookmarkBtn';
import NoteFactory from 'components/comment/CommentFactory';
import { dbService, firebaseInstance } from 'utils/fBase';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
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
  z-index: 1;
  :hover {
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
  z-index: 9;
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
  z-index: 9;
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
  white-space: pre-wrap;
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
  transition: all 0.5s ease-in-out;
  :hover {
    cursor: pointer;
    color: var(--gold);
  }
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  color: inherit;
  transition: 0.5s all ease-in-out;
  z-index: 9;
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
  z-index: 9;
  :hover {
    color: var(--gold);
    cursor: pointer;
  }
`;

const PrivateBtn = styled.button`
  font-family: Kyobo Handwriting;
  background: none;
  border: none;
  :hover {
    cursor: pointer;
  }
`;

const EditInput = styled.textarea`
  line-height: 17px;
  font-size: 0.7rem;
  width: 90%;
  min-height: 100px;
  z-index: 9;
`;

const PaperClip = styled.div`
  display: flex;
  gap: 3px;
  position: absolute;
  top: -7px;
  left: 0;
  font-size: 20px;
`;

const Answer = ({ answer, userObj, refreshFriends, refreshBookmarks }) => {
  const { id } = useParams();
  const [editState, setEditState] = useState(false);
  const [noteState, setNoteState] = useState(false);
  const [changedAnswer, setChangedAnswer] = useState('');
  
  const history = useHistory();

  const Time = new Date(answer.createdAt) 
  const year = Time.getFullYear();
  const month = Time.getMonth() + 1;
  const day = Time.getDate();
  const date = `${year}년 ${month < 10 ? '0'+month : month}월 ${day < 10 ? '0'+day : day}일`
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
        window.confirm('내용을 수정하시겠어요?') && dbService.collection('answers')
        .doc(answer.answerId)
        .update({
          answer: changedAnswer,
          editedAt: Date.now()
        });
      }
    }
  }

  const onClickDelete = e => {
    e.preventDefault();
    if (answer.userId === userObj.uid) {
      window.confirm('정말 지우실건가요?') && 
      dbService.collection('answers')
        .doc(`${answer.answerId}`)
        .delete()
      .then(() => {
        dbService.collection('main')
          .doc('counts')
          .update({
            answers: firebaseInstance.firestore.FieldValue.increment(-1)
          })
        
        alert('삭제되었습니다.');
      })
    }
  }
  
  const onClickNote = e => {
    e.preventDefault();
    setNoteState(!noteState);
  }

  const onClickDetail = e => {
    e.preventDefault();
    history.push(`/question/${answer.questionId}`);
  }

  const onClickUser = e => {
    e.preventDefault();
    history.push(`/useranswer/${answer.userId}`);
  }

  const onChange = e => {
    setChangedAnswer(e.target.value);
  }

  const onClickPrivate = async () => {
    window.confirm('공개 상태를 바꾸시겠어요?') &&
    await dbService.collection('answers')
      .doc(`${answer.answerId}`)
      .update({
        isPrivate: !answer.isPrivate
      })
    .then(() => {
      alert('성공적으로 변경되었습니다!');
    })
  }

  const onClickAnswer = e => {
    if (!editState) {
      if (id) {
        if (id !== answer.answerId) history.push(`/answer/${answer.answerId}`);
      } else {
        history.push(`/answer/${answer.answerId}`);
      }
    }
  }

  return (
    <Container style={{margin: `${Math.random() * 10 + 5}px`, left: `${Math.random() * 6 - 3}%`}}>
      {answer.bookmarkCount 
        ? 
          <PaperClip>
            {[...Array(answer.bookmarkCount)].map((el, index) => {
                  return <FontAwesomeIcon key={index} icon={faBookmark} />
                }
              )
            }
          </PaperClip>
        : null
      }
      <Question onClick={onClickDetail}>
        {answer.question}
      </Question>
      <InfoContainer>
        {answer.userId === userObj.uid 
        ? (
        <>
          <PrivateBtn onClick={onClickPrivate}>
            {answer.isPrivate 
              ? '공개하기'
              : '나만 보기'
            }
          </PrivateBtn>
          <IconBox onClick={onClickEdit}>
            {editState
              ? <FontAwesomeIcon style={{marginLeft: '5px'}} icon={faSave} />
              : <FontAwesomeIcon style={{marginLeft: '5px'}} icon={faPencilAlt} />
            }
          </IconBox>
          <IconBox onClick={onClickDelete}>
            <FontAwesomeIcon style={{marginLeft: '5px'}} icon={faTrashAlt} />
          </IconBox>
        </>
          )
        : (
          <>
            <FriendBtn 
              answer={answer} 
              userObj={userObj} 
              refreshFriends={refreshFriends} 
            />
            <BookmarkBtn 
              answer={answer} 
              userObj={userObj} 
              refreshBookmarks={refreshBookmarks} 
            />
          </>
        )}
      </InfoContainer>
      <ReplyIcon onClick={onClickNote}>
        <FontAwesomeIcon icon={faReply} style={{ transform: 'rotate(180deg)' }} />
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
        {answer.editedAt && '(수정됨)'}
      </CreatedAt>
      <WriterContainer>
        <Writer onClick={onClickUser}>
          - {answer.userName}{answer.isPrivate && ' (나에게만 보임)'}
        </Writer>
      </WriterContainer>
      <Content onClick={onClickAnswer}>
        {editState 
          ? <EditInput autoFocus onChange={onChange} value={changedAnswer} />
          : answer.answer
        }
      </Content>
      {noteState && 
        <NoteFactory userObj={userObj} answer={answer} setNoteState={setNoteState} />
      }
    </Container>
  );
}

export default Answer;
  