import React, { useEffect, useState } from 'react';
import Answer from 'components/answer/Answer';
import styled from 'styled-components';
import { dbService } from 'utils/fBase';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 90%;
    height: 100%;
    color: white;
`;

const Title = styled.h1`
    margin: 30px;
    font-size: 1.5rem;
`;

const Bookmarks = ({ userObj, refreshFriends, refreshBookmarks, bookmarksLoading, setBookmarksLoading }) => {
    const [someoneAnswers, setSomeoneAnswers] = useState([]);

    const getBookmarks = async () => {
        if(userObj.bookmarks && userObj.bookmarks.length !== 0) {
            let bookmarksArray = [];
            await userObj.bookmarks.forEach(async (bookmark) => {
                await dbService.collection("answers")
                    .where("answerId", "==", bookmark)
                    .get()
                .then(snapshot => {
                    const data = snapshot.docs[0].data();
                    bookmarksArray.push(data);

                    if (bookmarksArray.length === userObj.friends.length) {
                        setSomeoneAnswers(bookmarksArray);
                        setBookmarksLoading(false);
                    }
                });
            })
        } else {
            setSomeoneAnswers([]);
            setBookmarksLoading(false);
        }
    }

    useEffect(()=>{
        getBookmarks();
    }, [])

    return (
        <Container>
        { bookmarksLoading 
        ? null
        : 
        <>
            <Title>
                책갈피함
            </Title>
            {someoneAnswers.length 
            ?             
                someoneAnswers.map(answer => 
                    <Answer 
                        key={answer.answerId} 
                        answer={answer} 
                        refreshFriends={refreshFriends} refreshBookmarks={refreshBookmarks} userObj={userObj}
                    />
                )
            : `아직 비어있어요. 다른 사람들의 대답으로 채워보세요!`
            }

        </> 
        }
        </Container>
    );
};

export default Bookmarks;