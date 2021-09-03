import React from "react";
import styled from "styled-components";
import Friends from "../components/Friends";
import Notes from "../components/Notes";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

const Community = ({userObj}) => {
    return (
        <Container>
            <Notes userObj={userObj} />
            <Friends />
        </Container>
    )
}

export default Community;