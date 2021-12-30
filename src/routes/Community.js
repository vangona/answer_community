import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Answer from "../components/Answer";
import Friends from "../components/Friends";
import Loading from "../components/Loading";
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
    const [bookmarkLoading, setBookmarkLoading] = useState(false);
    const [someoneAnswers, setSomeoneAnswers] = useState('');

    const getSomeoneAnswers = async () => {
        if (userObj.bookmarks && userObj.bookmarks.length !== 0) {
            let someoneAnswerArray = [];
            userObj.bookmarks.forEach(async (element) => {
                await dbService.collection("answers").where("answerId", "==", element)
                .get()
                .then(snapshot => {
                    someoneAnswerArray.push(...snapshot.docs
                        .map(
                            doc => ({
                                id: doc.answerId,
                                ...doc.data()    
                            })
                        )
                    )
                }).catch((e) => {
                    throw new Error('책갈피 로딩 에러');
                })
            })
            
            someoneAnswerArray.sort((a, b) => {
                if(a.createdAt > b.createdAt) return -1;
                if(a.createdAt === b.createdAt) return 0;
                if(a.createdAt < b.createdAt) return 1;
            });
            setSomeoneAnswers(someoneAnswerArray);
        } else {
            setSomeoneAnswers([]);
        }
        setBookmarkLoading(true);
        setIsLoading(false);
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
                    <Friends userObj={userObj} refreshFriends={refreshFriends} />
                    {/* <Notes userObj={userObj} noteData={noteData} /> */}
                    {bookmarkLoading && someoneAnswers && 
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