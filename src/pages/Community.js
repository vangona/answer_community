import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Answer from "components/answer/Answer";
import Friends from "components/community/Friends";
import Loading from "components/loading/Loading";
import { dbService } from "utils/fBase";
import Bookmarks from "components/community/Bookmarks";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 80px;
    padding: 10px 0; 
    justify-content: flex-start;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;

const Title = styled.h1`
    color: white;
    margin: 20px;
    font-size: 1.5rem;
`;

const Community = ({userObj, refreshFriends, refreshBookmarks}) => {
    const [friendsLoading, setFriendsLoading] = useState(true);
    const [bookmarksLoading, setBookmarksLoading] = useState(true);

    return (
        <Container>
            {
                friendsLoading && bookmarksLoading && <Loading />
            }
            <Title>
                누군가의 서랍장
            </Title>
            <Friends 
                userObj={ userObj } 
                refreshFriends={ refreshFriends } 
                friendsLoading={ friendsLoading }
                setFriendsLoading={ setFriendsLoading }
            />
            <Bookmarks 
                userObj={ userObj } 
                refreshFriends={ refreshFriends } 
                refreshBookmarks={ refreshBookmarks } 
                bookmarksLoading={ bookmarksLoading }
                setBookmarksLoading={ setBookmarksLoading }
            />
        </Container>
    )
}

export default Community;