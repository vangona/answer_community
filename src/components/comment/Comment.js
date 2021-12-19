import { faPencilAlt, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { dbService } from "../../fBase";

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

const EditInput = styled.textarea`
    height: 1rem;
`;

const Content = styled.div``;

const IconContainer = styled.div`
    display: flex;
    gap: 5px;
    opacity: 70%;
`;

const Icon = styled.div`
    transition: all 0.5s ease-in-out;
    :hover {
        cursor: pointer;
        color: var(--gold);
    }
`;

const InfoContainer = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 5px;
    font-size: 0.7rem;
`;
const Writer = styled.span``;
const Time = styled.span``;

const Comment = ({userObj, note}) => {
    const [editState, setEditState] = useState(false);
    const [editContent, setEditContent] = useState('');

    const dttm = new Date(note.createdAt) 
    const year = dttm.getFullYear();
    const month = dttm.getMonth() + 1;
    const day = dttm.getDate();
    const date = `${year}년 ${month < 10 ? "0"+month : month}월 ${day < 10 ? "0"+day : day}일`
    const lastTime = (Date.now() - note.createdAt) / 1000 / 60
    const lastMinutes = Math.round(lastTime)
    const lastHours = Math.round(lastTime / 60)
    const lastDays = Math.round(lastHours / 24)

    const onChange = e => {
        setEditContent(e.target.value);
    }

    const onClickEdit = () => {
        if (!editState) {
            setEditContent(note.noteContent);
        } else if (editContent !== note.noteContent) {
            window.confirm('쪽지를 수정하시겠어요?') &&
            dbService.collection("notes").doc(`${note.noteId}`).update({
                noteContent: editContent
            })
        }
        setEditState(!editState);
    }

    const onClickDelete = () => {
        window.confirm('쪽지를 떼시겠어요?') &&
        dbService.collection("notes").doc(`${note.noteId}`).delete();
    }

    return (
        <Container>
            <Content>
                {editState
                    ? <EditInput onChange={onChange} value={editContent} />
                    : note.noteContent
                }
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
                {userObj.uid === note.writer && <IconContainer>
                    <Icon onClick={onClickEdit}>
                        {editState 
                        ? <FontAwesomeIcon icon={faSave} />
                        : <FontAwesomeIcon icon={faPencilAlt} />
                        }
                    </Icon>
                    <Icon onClick={onClickDelete}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Icon>
                </IconContainer>}
            </InfoContainer>
        </Container>
    )
}

export default Comment;