import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Loading from "../components/Loading";
import { dbService } from "../fBase";

const Container = styled.div``;

const NoteContainer = styled.div``;

const NotesAnswer = ({userObj}) => {
    const {id, answerId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [notesData, setNotesData] = useState('');

    const getNotes = () => {
        dbService.collection("notes").where("receiver", "==", `${userObj.uid}`).where("writer", "==", `${id}`).where("answerId", "==", `${answerId}`).onSnapshot(querySnapshot => {
            const notesArray = querySnapshot.docs.map(doc => ({
                ...doc.data()
            })
            )
            setNotesData(notesArray)
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
            {notesData.map(note => (
                <NoteContainer>
                    {note.answer}
                    {note.writerName}
                </NoteContainer>
            ))}
            </>
            }
        </Container>
    )
}

export default NotesAnswer;