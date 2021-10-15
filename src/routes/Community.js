import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Friends from "../components/Friends";
import Loading from "../components/Loading";
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

const Community = ({userObj, refreshFriends}) => {
    const [friendLoading, setFriendLoading] = useState(false);
    const [noteLoading, setNoteLoading] = useState(false);

    const getFriendLoading = (loading) => {
        setFriendLoading(loading);
    }

    const getNoteLoading = (loading) => {
        setNoteLoading(loading)
    }

    useEffect(() => {
    }, [])

    return (
        <Container>
            <Friends userObj={userObj} loading={friendLoading} refreshFriends={refreshFriends} getFriendLoading={getFriendLoading} />
            <Notes userObj={userObj} loading={noteLoading} getNoteLoading={getNoteLoading} />
        </Container>
    )
}

export default Community;