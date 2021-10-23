import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Friends from "../components/Friends";
import Notes from "../components/Notes";

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
    const [friendLoading, setFriendLoading] = useState(false);

    const getFriendLoading = (loading) => {
        setFriendLoading(loading);
    }

    useEffect(() => {
    }, [])

    return (
        <Container>
            <Friends userObj={userObj} loading={friendLoading} refreshFriends={refreshFriends} getFriendLoading={getFriendLoading} />
            <Notes userObj={userObj} noteData={noteData} />
        </Container>
    )
}

export default Community;