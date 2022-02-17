import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Loading from "components/loading/Loading";
import NoteDetail from "components/note/NoteDetail";
import { dbService } from "utils/fBase";

const Container = styled.div`
    display: flex;
    padding-top: 30px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
    margin-top: 20px;
    box-sizing: border-box;
`;

const Title = styled.h1`
    margin: 20px;
    display: flex;
    color: white;
    font-size: 1.5rem;
    font-family: Kyobo Handwriting;
    flex-direction: column;
`;

const NotesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
    padding: 10px;
    box-sizing: border-box;
    max-height: 80vh;
`;

const NotesAnswer = ({userObj}) => {
    const {id, answerId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [notesData, setNotesData] = useState('');
    const [question, setQuestion] = useState('');

    const getNotes = () => {
        dbService.collection("notes").where("receiver", "in", [`${userObj.uid}`, `${id}`]).where("answerId", "==", `${answerId}`).onSnapshot(querySnapshot => {
            const notesArray = querySnapshot.docs.map(doc => ({
                ...doc.data()
            })
            )
            notesArray.sort((a, b) => {
                if(a.createdAt < b.createdAt) return -1;
                if(a.createdAt === b.createdAt) return 0;
                if(a.createdAt > b.createdAt) return 1;
            });
            setNotesData(notesArray);
            setQuestion(notesArray[0].answer);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getNotes();
    }, [])

    return (
        <Container>
            {isLoading 
            ? <Loading />
            :
            <>
            <Title>{question}로부터 시작된 쪽지</Title>
            <NotesContainer>
                {notesData.map(note => (
                    <NoteDetail noteData={note} userObj={userObj} />
                ))}
            </NotesContainer>
            </>
            }
        </Container>
    )
}

export default NotesAnswer;