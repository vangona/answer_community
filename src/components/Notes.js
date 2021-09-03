import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dbService } from "../fBase";

const Container = styled.div`
    width: 90%;
    background-color: rgba(255,255,255,0.5);
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 10px;
`;

const Title = styled.h1`
    color: white;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

const NoteContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const NoteTitle = styled.div`
`;

const NoteWriter = styled.span`
    font-size: 12px;
`;

const NoteAnswer = styled.span`
    font-size: 12px;
`;

const Notes = ({userObj}) => {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getNotes = async () => {
        await dbService.collection("notes").where("receiver", "==", `${userObj.uid}`).onSnapshot(querySnapshot => {
            const noteArray = querySnapshot.docs.map(doc => ({
                id: doc.noteId,
                ...doc.data(),
            }))
            setNotes(noteArray);
            setIsLoading(false);
            console.log(noteArray)
        })
    }

    useEffect(() => {
        getNotes();
    }, [])
    return (
        <Container>
            {isLoading 
            ? "Loading..."
            : (
            <>
                <Title>쪽지함</Title>
                <hr />

                {notes.map(note => (
                    <>
                    <Column>
                    <NoteAnswer>{note.answer}에서 온 쪽지입니다.</NoteAnswer>
                        <NoteContainer key={note.noteId}>
                        <NoteTitle>
                            {note.noteContent}
                        </NoteTitle>
                        <NoteWriter>
                            - {note.writerName}
                        </NoteWriter>
                        </NoteContainer>
                    </Column>
                    </>
                ))}
            </>
                )
            }
        </Container>
    )
}

export default Notes;