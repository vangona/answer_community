import React, { useState } from "react";
import styled from "styled-components";
import { dbService } from "../fBase";
import { PaperAirplaneIcon } from "@heroicons/react/outline"
import { v4 as uuidv4} from "uuid";

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
`;

const Title = styled.div``;

const NoteTextarea = styled.textarea`
    font-size: 12px;
    width: 95%;
`;

const IconBox = styled.div`
    display: flex;
    width: 100%;
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

    const onSubmit = e => {
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
            answer: answer.answer
        }
        dbService.collection("notes").doc(`${noteId}`).set(noteObj)
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
            <IconBox onClick={onSubmit}>
                <PaperAirplaneIcon style={{width:"16px", height:"16px", transform: "rotateZ(45deg)"}} />
            </IconBox>
        </Container>
    )
}

export default NoteFactory;