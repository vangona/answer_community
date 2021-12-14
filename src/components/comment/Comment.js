import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    background: white;
    opacity: 80%;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    color: black;
`;

const Content = styled.div``;
const InfoContainer = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 5px;
    font-size: 0.7rem;
`;
const Writer = styled.span``;
const Time = styled.span``;

const Comment = ({note}) => {
    const dttm = new Date(note.createdAt) 
    const year = dttm.getFullYear();
    const month = dttm.getMonth() + 1;
    const day = dttm.getDate();
    const date = `${year}년 ${month < 10 ? "0"+month : month}월 ${day < 10 ? "0"+day : day}일`
    const lastTime = (Date.now() - note.createdAt) / 1000 / 60
    const lastMinutes = Math.round(lastTime)
    const lastHours = Math.round(lastTime / 60)
    const lastDays = Math.round(lastHours / 24)

    return (
        <Container>
            <Content>
                {note.noteContent}
            </Content>
            <InfoContainer>
                <Writer>
                    {note.writerName}
                </Writer>
                <Time>
                    {lastMinutes < 60 
                    ? `${lastMinutes}분 전` 
                    : lastHours < 24 
                    ? `${lastHours}시간 전`
                    : lastDays > 7
                        ? `${date}`
                        : `${lastDays}일 전`
                    }
                    {note.editedAt && "(수정됨)"}
                </Time>
            </InfoContainer>
        </Container>
    )
}

export default Comment;