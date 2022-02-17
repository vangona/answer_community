import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    background-color: rgba(255,255,255,0.7);
    width: 95%;
    padding: 15px;
    border-radius: 10px;
    box-sizing: border-box;
`;

const NoteTitle = styled.h3`
    font-size: 0.9rem;
    margin-bottom: 10px;
`;

const NoteContent = styled.div`
    display: flex;
    gap: 5px;
    font-size: 0.9rem;
    :hover {
        cursor: pointer;
    }
`;

const NoteWriter = styled.span`
    bottom: 5px;
    right: 5px;
    position: absolute;
    font-size: 0.7rem;
    opacity: 80%;
`;

const NoteTime = styled.span`
    top: 5px;
    right: 5px;
    position: absolute;
    font-size: 0.7rem;
    opacity: 80%;
`;

const NotesList = ({noteData}) => {
    const history = useHistory();

    const onClickAnswer = () => {
        history.push(`/notes/user/${noteData.writer}/${noteData.answerId}`)
    }

    const Time = new Date(noteData.createdAt) 
    const year = Time.getFullYear();
    const month = Time.getMonth() + 1;
    const day = Time.getDate();
    const date = `${year}년 ${month < 10 ? "0" + month : month}월 ${day < 10 ? "0"+day : day}일`
    const lastTime = (Date.now() - noteData.createdAt) / 1000 / 60
    const lastMinutes = Math.round(lastTime)
    const lastHours = Math.round(lastTime / 60)
    const lastDays = Math.round(lastHours / 24)

    return (
        <Container>
            <NoteTitle>
                '{noteData.answer.length > 9 ? noteData.answer.slice(0, 10) + "..." : noteData.answer}'에서 시작된 쪽지
            </NoteTitle>
            <NoteContent onClick={onClickAnswer}>
                <FontAwesomeIcon icon={faCommentAlt} size="sm" /> {noteData.noteContent}
            </NoteContent>
            <NoteTime>
                {lastMinutes < 60 
                    ? `${lastMinutes}분 전` 
                    : lastHours < 24 
                    ? `${lastHours}시간 전`
                    : lastDays > 7
                        ? `${date}`
                        : `${lastDays}일 전`
                }
            </NoteTime>
            <NoteWriter>
                - {noteData.writerName}
            </NoteWriter>    
        </Container>
    )
}

export default NotesList;