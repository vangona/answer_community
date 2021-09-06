import React, { useState } from "react";
import styled from "styled-components";
import Reply from "./Reply";

const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    color: rgba(0,0,0,0.5);
    transition: 0.5s all ease-in-out;
    :hover, :focus-within {
        color: black;
    }
`;

const NoteContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    :hover {
        cursor: pointer;
    }
`;

const NoteTitle = styled.div`
    font-size: 12px;
`;

const NoteWriter = styled.span`
    font-size: 12px;
`;

const NoteAnswer = styled.span`
    font-size: 12px;
    margin-bottom: 5px;
`;

const Note = ({note, userObj}) => {
    const [replyState, setReplyState] = useState(false);

    const onClickReply = () => {
        setReplyState(!replyState)
    }
    return (
        <Column key={note.noteId}>
            <NoteAnswer>'{note.answer}'에서 온 쪽지입니다.
            </NoteAnswer>
            <NoteContainer onClick={onClickReply}>
            <NoteTitle>
                {note.noteContent}
            </NoteTitle>
            <NoteWriter>
                - {note.writerName}
            </NoteWriter>
            </NoteContainer>
            {replyState && <Reply note={note} userObj={userObj} />}
        </Column>
    )
}

export default Note;