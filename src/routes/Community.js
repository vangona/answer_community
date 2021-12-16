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
    margin-top: 50px;
    padding: 10px 0; 
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

const Title = styled.h1`
    color: white;
    margin: 20px;
    font-size: 1.2rem;
`;

const Community = ({userObj, refreshFriends, refreshBookmarks, noteData}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [friendLoading, setFriendLoading] = useState(false);
    const [someoneAnswers, setSomeoneAnswers] = useState('');

    const getFriendLoading = (loading) => {
        setFriendLoading(loading);
    }

    const getSomeoneAnswers = async () => {
        userObj.bookmarks.length && dbService.collection("answers").where("answerId", "in", userObj.bookmarks).onSnapshot(snapshot => {
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
        })
        setIsLoading(!isLoading);
    }

    useEffect(()=>{
        getFriendLoading();
        getSomeoneAnswers();
    }, [])

    return (
        <Container>
            {isLoading
            ? <Loading />
            : 
                <>
                    <Friends userObj={userObj} loading={friendLoading} refreshFriends={refreshFriends} getFriendLoading={getFriendLoading} />
                    {/* <Notes userObj={userObj} noteData={noteData} /> */}
                    {someoneAnswers && 
                    <>
                        <Title>
                            책갈피함
                        </Title>
                        {someoneAnswers.map(answer => 
                            <Answer key={answer.answerId} answer={answer} refreshFriends={refreshFriends} refreshBookmarks={refreshBookmarks} userObj={userObj}/>
                        )}
                    </>
                    }
                </>
            }
        </Container>
    )
}

export default Community;