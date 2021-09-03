import React, { useState } from "react";
import styled from "styled-components";
import { MailIcon } from "@heroicons/react/outline"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { dbService } from "../fBase";

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
  color: white;
  border-radius: 10px;
  background-color: var(--main-color);
  margin: 10px;
  :hover {
      color: var(--gold);
  }
`;

const Question = styled.h1`
transition: 0.3s all ease-in-out;
  font-family: Jeju Myeongjo;
  margin-bottom: 20px;
  font-size: 14px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s all ease-in-out;
  color: inherit;
  position: absolute;
  bottom: 10px;
  right: 15px;
  font-size: 10px;
`;

const CreatedAt = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 10px;
`;

const Writer = styled.span`
  transition: 0.3s all ease-in-out;
  text-align: right;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 10px;
`;

const Content = styled.div`
  text-indent: 5px;
  line-height: 17px;
  background-color: white;
  border-radius: 10px;
  word-break: keep-all;
  font-family: Jeju Myeongjo;
  width: 100%;
  padding: 15px;
  font-size: 12px;
  opacity: 70%;
  color: black;
  box-sizing: border-box;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  :hover {
    cursor: pointer;
  }
`;

const EditInput = styled.textarea`
  line-height: 17px;
  font-size: 10px;
  width: 90%;
`;

const Answer = ({answer, userObj}) => {
  const [editState, setEditState] = useState(false);
  const [changedAnswer, setChangedAnswer] = useState('');

  const lastTime = (Date.now() - answer.createdAt) / 1000 / 60
  const lastMinutes = Math.round(lastTime)
  const lastHours = Math.round(lastTime / 60)
  const lastDays = Math.round(lastHours / 24)

  const onClickEdit = e => {
    e.preventDefault();
    if (answer.userId === userObj.uid) {
      setEditState(!editState);
      if(changedAnswer !== answer.answer) {
        window.confirm("내용을 바꿀까요?") 
        && dbService.collection("answers").doc(answer.answerId).update({
          answer: changedAnswer,
          modifedAt: Date.now()
        }) 
      }
    }
  }

  const onClickDelete = e => {
    e.preventDefault();
    if (answer.userId === userObj.uid) {
      window.confirm("정말 지우실건가요?") 
      && dbService.collection("answers").doc(answer.answerId).delete(); 
    }
  }

  const onClickNote = e => {
    e.preventDefault();
  }

  const onChange = e => {
    setChangedAnswer(e.target.value)
  }

  return (
    <Container>
      <Question>{answer.question}</Question>
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
          <IconBox>
            <MailIcon style={{width: "15px", marginLeft: "5px"}} />
          </IconBox>
        )}
      </InfoContainer>
      <CreatedAt>{lastMinutes < 60 
        ? `${lastMinutes}분 전` 
        : lastHours < 24 
          ? `${lastHours}시간 전`
          : `${lastDays}일 전`
        }</CreatedAt>
      <Writer>- {answer.userName}</Writer>
      <Content>
        {editState 
        ? <EditInput autoFocus onChange={onChange} value={changedAnswer ? changedAnswer : answer.answer} />
        : answer.answer}
      </Content>
    </Container>
  );
}

export default Answer;
  