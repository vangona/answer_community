import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { authService, dbService } from "../fBase";

const Container = styled.div`
    width: 90%;
    background-color: rgba(255,255,255,0.5);
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
`;

const Title = styled.h1`
    color: white;
`;

const Friends = ({userObj}) => {

    return (
        <Container>
            <Title>친구들</Title>
            <hr />
            <div></div>
        </Container>
    )
}

export default Friends;