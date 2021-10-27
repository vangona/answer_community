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

const NoteDetail = ({noteData}) => {
    const getTime = (time) => {
        const Time = new Date(time) 
        const year = Time.getFullYear();
        const month = Time.getMonth() + 1;
        const day = Time.getDate();
        const date = `${year}년 ${month < 10 ? "0"+month : month}월 ${day < 10 ? "0"+day : day}일`
        return date;
    }

    return (
        <Container>
            <NoteContent>
                {noteData.answer}
            </NoteContent>
            <NoteTime>
                {getTime(noteData.createdAt)}
            </NoteTime>
            <NoteWriter>
                - {noteData.writerName}
            </NoteWriter>    
        </Container>
    )
}

export default NoteDetail;