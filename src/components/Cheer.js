import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 60%;
    height: 100px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CheerPhrase = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
    word-break: keep-all;
`;

const Cheer = ({cheer}) => {
    return (
        <Container>
            <CheerPhrase>
                {cheer.cheer}
            </CheerPhrase>
        </Container>
        
    )
}

export default Cheer;