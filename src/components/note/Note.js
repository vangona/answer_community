import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { dbService } from "utils/fBase";
import Reply from "./Reply";

const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    color: rgba(0,0,0,0.5);
    transition: 0.5s all ease-in-out;
    :focus-within {
        color: black;
    }
`;

const NoteContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const NoteTitle = styled.div`
    transition: 0.5s all ease-in-out;
    font-size: 0.7rem;
    :hover {
        cursor: pointer;
        color: black;
    }
`;

const NoteWriter = styled.span`
    text-align: right;
    width: 50px;
    word-break: keep-all;
    font-size: 12px;
    transition: 0.5s all ease-in-out;
    :hover {
        cursor: pointer;
        color: black;
    }
`;

const NoteAnswer = styled.span`
    font-size: 12px;
    margin-bottom: 5px;
    transition: 0.5s all ease-in-out;
    :hover {
        cursor: pointer;
        color: black;
    }
`;

const NoteIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-right: 5px;
`;

const DeleteIcon = styled.div`
    display: flex;
    :hover {
        cursor: pointer;
        color: black;
        transition: 0.5s all ease-in-out;
    }
`;

const Note = ({note, userObj}) => {
    const [replyState, setReplyState] = useState(false);
    const history = useHistory();

    const onDeleteClick = (e) => {
        if (window.confirm("삭제할까요?")) {
            dbService.collection("notes").doc(`${note.noteId}`).delete()
        } 
    }

    const onClickReply = () => {
        setReplyState(!replyState)
    }

    const onClickUser = () => {
        history.push(`/notes/user/${note.writer}`)
    }

    const onClickAnswer = () => {
        history.push(`/notes/user/${note.writer}/${note.answerId}`)
    }

    return (
        <Column key={note.noteId}>
            <NoteAnswer onClick={onClickAnswer}>'{note.answer.slice(0, 15)}{note.answer.length > 15 && "..."}'라고 쓴 답변에서 온 쪽지입니다.
            </NoteAnswer>
            <NoteContainer>
                <NoteTitle onClick={onClickReply}>
                    {note.noteContent}
                </NoteTitle>
                <NoteIcon>
                    <NoteWriter onClick={onClickUser}>
                        - {note.writerName}
                    </NoteWriter>
                    <DeleteIcon>
                      <FontAwesomeIcon onClick={onDeleteClick} icon={faTrashAlt} size="sm" />
                    </DeleteIcon>
                </NoteIcon>
            </NoteContainer>
            {replyState && <Reply note={note} userObj={userObj} />}
        </Column>
    )
}

export default Note;