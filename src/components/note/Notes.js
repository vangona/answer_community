import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dbService } from "utils/fBase";
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

const NoteBox = styled.div`
    color: rgba(0,0,0,0.5);
    margin-top: 15px;
    font-size: 14px;
    text-align: center;
`;

const NoteList = styled.div`
    width: 100%;
    padding: 3px 0;
    max-height: 60vh;
    overflow: auto;
    ::-webkit-scrollbar {
        width: 7px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgba(255,255,255,0.7);
        border-radius: 5px;
    }
`;

const Notes = ({userObj}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [noteData, setNoteData] = useState('');

    const getMessage = () => {
        dbService.collection("notes").where("receiver", "==", `${userObj.uid}`).onSnapshot(querySnapshot => {
            let noteArray = querySnapshot.docs.map(doc => ({
                id: doc.noteId,
                ...doc.data(),
            }))
            noteArray.sort((a, b) => {
                if(a.createdAt > b.createdAt) return -1;
                if(a.createdAt === b.createdAt) return 0;
                if(a.createdAt < b.createdAt) return 1;
              });
            setNoteData(noteArray);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getMessage();
    }, [])
    
    return (
            <Container>
                {isLoading 
                    ? null
                    :
                    <>
                    <Title>쪽지함</Title>
                    <hr />

                    {noteData.length === 0 
                    ? <NoteBox>표시할 쪽지가 없습니다.</NoteBox>
                    : (<NoteList>
                        {noteData.map(note => (
                            <Note userObj={userObj} note={note} />
                        ))}
                    </NoteList>)
                    }
                    </>
                }
            </Container>
    )
}

export default Notes;