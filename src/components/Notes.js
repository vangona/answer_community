import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 90%;
    background-color: rgba(255,255,255,0.5);
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 10px;
`;

const Title = styled.h1`
    color: white;
`;

const Notes = () => {
    return (
        <Container>
            <Title>쪽지함</Title>
            <hr />
        </Container>
    )
}

export default Notes;