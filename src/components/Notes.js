import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dbService } from "../fBase";
import Note from "./Note";

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
                        <Note userObj={userObj} note={note} />
                    </>
                ))}
            </>
                )
            }
        </Container>
    )
}

export default Notes;