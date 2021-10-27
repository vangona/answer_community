import React, { useState } from "react";
import styled from "styled-components";
import { dbService } from "../fBase";
import { PaperAirplaneIcon } from "@heroicons/react/outline"
import { v4 as uuidv4} from "uuid";
import axios from "axios";

const Container = styled.div`
    margin-top: 10px;
    text-indent: 5px;
  line-height: 17px;
  background-color: white;
  word-break: keep-all;
  border-bottom-right-radius: 10px;
  font-family: Jeju Myeongjo;
  width: 100%;
  padding: 15px;
  font-size: 12px;
  opacity: 70%;
  color: black;
  box-sizing: border-box;
  position: relative;
`;

const Title = styled.div``;

const NoteTextarea = styled.textarea`
    font-size: 12px;
    width: 95%;
`;

const IconBox = styled.div`
    display: flex;
    position: absolute;
    width: 20px;
    right: 5px;
    top: 5px;
    justify-content: flex-end;
    :hover {
        cursor: pointer;
    }
`;

const NoteFactory = ({answer, userObj, setNoteState}) => {
    const [noteContent, setNoteContent] = useState('');

    const onChange = e => {
        setNoteContent(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (noteContent) {
            const noteId = uuidv4()
            const noteObj = {
            noteContent,
            noteId,
            createdAt: Date.now(),
            writer: userObj.uid,
            writerName: userObj.displayName,
            receiver: answer.userId,
            answer: answer.answer,
            answerId: answer.answerId,
            isRead: false,
        }
        dbService.collection("notes").doc(`${noteId}`).set(noteObj)
        await dbService.collection("users").doc(`${answer.userId}`).get()
        .then(snapshot => {
            const data = snapshot.data()
            const token = data.token
            axios.post("https://fcm.googleapis.com/fcm/send", {
                "to": `${token}`,
                "notification": {
                    "title": `${userObj.displayName}님에게 쪽지가 도착했습니다.`,
                    "body": `${noteContent}`
                }
            }, 
            {
                headers:  
                {
                    "Content-Type": "application/json",
                    "Authorization": "key=AAAAbdbI9T8:APA91bHBHA83-rpRKMQChKE7FcUkvFSzbZ1qHOBZhrXNxBdo6U2cfB89xqpbsLIjYbBHVyGhOMFWwZNlRMF0I9cAshUvrkhyWDZqMcjgx5FzuAL3P9IK2YivTtQfdvygSIAhk9HVM30K"
                }
            })
            .then(response => {console.log(response)})
            .catch(response => {console.log(response)})
        })
        alert("쪽지가 성공적으로 보내졌습니다 :)")
        setNoteState(false);
        setNoteContent('');
    }
    }
    return (
        <Container>
            <Title>쪽지</Title>
            <hr />
            <NoteTextarea value={noteContent} onChange={onChange} />
            <IconBox onClick={(e) => {
                if(window.confirm(`${answer.userName}님께 쪽지를 보낼까요?`)){
                    onSubmit(e)
                }
                
            }}>
                <PaperAirplaneIcon style={{width:"16px", height:"16px", transform: "rotateZ(45deg)"}} />
            </IconBox>
        </Container>
    )
}

export default NoteFactory;