import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Loading from "../components/Loading";
import NotesList from "../components/NotesList";
import { dbService } from "../fBase";

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
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
`;

const NoteCategory = styled.div``;

const NotesAnswer = ({userObj}) => {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [notesData, setNotesData] = useState('');
    const [userName, setUserName] = useState('');
    const [notesCategory, setNotesCategory] = useState([]);

    const getNotes = () => {
        dbService.collection("notes").where("receiver", "==", `${userObj.uid}`).where("writer", "==", `${id}`).onSnapshot(querySnapshot => {
            let notesCategoryData = [];
            let notesCategoryAnswer = [];
            const notesArray = querySnapshot.docs.map(doc => ({
                ...doc.data()
            })
            )
            notesArray.sort((a, b) => {
                if(a.createdAt > b.createdAt) return -1;
                if(a.createdAt === b.createdAt) return 0;
                if(a.createdAt < b.createdAt) return 1;
            });
            for (let i = 0; i < notesArray.length; i++) {
                if (!notesCategoryData.includes(notesArray[i].answerId)) {
                    notesCategoryData.push(notesArray[i].answerId);
                    notesCategoryAnswer.push(notesArray[i]);
                }
            }
            setUserName(notesArray[0].writerName)
            setNotesCategory(notesCategoryAnswer)
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
            <Title>{userName}님과의 쪽지들</Title>
            <NotesContainer>
                {notesCategory.map(category => 
                    <NotesList noteData={category} />
                )
                }
            </NotesContainer>
            </>
            }
        </Container>
    )
}

export default NotesAnswer;