import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Answer from "../components/Answer";
import Friends from "../components/Friends";
import Loading from "../components/Loading";
import Notes from "../components/Notes";
import { dbService } from "../fBase";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    padding: 10px 0; 
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

const Community = ({userObj, refreshFriends, noteData}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [friendLoading, setFriendLoading] = useState(false);
    const [someoneAnswers, setSomeoneAnswers] = useState('');

    const getFriendLoading = (loading) => {
        setFriendLoading(loading);
    }

    const getSomeoneAnswers = async () => {
        await dbService.collection("answers").where("answerId", "in", userObj.bookmarks).get()
        .then(snapshot => {
            const someoneAnswerArray = snapshot.docs.map(doc => ({
                id: doc.answerId,
                ...doc.data()    
            }))
            someoneAnswerArray.sort((a, b) => {
                if(a.createdAt > b.createdAt) return -1;
                if(a.createdAt === b.createdAt) return 0;
                if(a.createdAt < b.createdAt) return 1;
              });
            setSomeoneAnswers(someoneAnswerArray);
            setIsLoading(!isLoading);
        })
    }

    useEffect(()=>{
        getSomeoneAnswers();
    }, [])

    return (
        <Container>
            {isLoading
            ? <Loading />
            : 
                <>
                    <Friends userObj={userObj} loading={friendLoading} refreshFriends={refreshFriends} getFriendLoading={getFriendLoading} />
                    <Notes userObj={userObj} noteData={noteData} />
                    {someoneAnswers.map(answer => 
                        <Answer key={answer.answerId} answer={answer} userObj={userObj}/>
                    )
                    }
                </>
            }
        </Container>
    )
}

export default Community;