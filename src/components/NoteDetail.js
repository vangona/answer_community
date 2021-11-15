import react from "react";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    background-color: rgba(255,255,255,0.7);
    min-width: 120px;
    padding: 15px;
    border-radius: 10px;
`;

const NoteContent = styled.div`
    font-size: 1rem;
    padding: 10px 0;
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

const NoteDetail = ({noteData, userObj}) => {

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
        <Container style={{alignSelf: noteData.writer === userObj.uid ? "flex-end" : "flex-start"}} >
            <NoteContent>
                {noteData.noteContent}
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

export default NoteDetail;