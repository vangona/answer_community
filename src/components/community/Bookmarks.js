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

    const getSomeoneAnswers = async () => {
        if (userObj.bookmarks && userObj.bookmarks.length !== 0) {
            let someoneAnswerArray = [];
            await userObj.bookmarks.forEach(async (element) => {
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
            
                    someoneAnswerArray.sort((a, b) => {
                        return b.createdAt - a.createdAt;
                    });

                }).catch((e) => {
                    throw new Error('책갈피 로딩 에러');
                })
            })

            setSomeoneAnswers(someoneAnswerArray);
            setBookmarksLoading(false);
        } else {
            setSomeoneAnswers([]);
            setBookmarksLoading(false);
        }
    }

    useEffect(()=>{
        getSomeoneAnswers();
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