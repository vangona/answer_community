import React from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";

const Container = styled(animated.div)`
    position: relative;
    top: 50px;
    width: 80%; 
    height: 130px;
    padding: 30px 0;
    box-sizing: border-box;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 50%;
    border-radius: 10px;
    box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.75);
    -webkit-box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.75);
`;

const CheerPhrase = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 80%;
    word-break: keep-all;
    line-height: 25px;
    font-size: 18px;
    font-family: Kyobo Handwriting;
`;

const Cheer = ({cheer}) => {
    const animation = useSpring({
        from: {
            opacity: 0,
            y: 10
        },
        to: {
            opacity: 0.5,
            y: 0
        }
    })
    return (
        <Container style={animation}>
            <CheerPhrase>
                {cheer.cheer}
            </CheerPhrase>
        </Container>
    )
}

export default Cheer;