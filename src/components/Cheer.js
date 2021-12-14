import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { CheerComment } from "./DB/CheerDB";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const Container = styled(animated.div)`
    position: relative;
    margin-top: 20px;
    margin-bottom: 15px;
    width: 90%; 
    min-height: 100px;
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

const CloseBtn = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: transparent;
    color: white;
    :hover {
        cursor: pointer;
    }
`;

const CheerPhrase = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 80%;
    word-break: keep-all;
    line-height: 25px;
    font-size: 1.1rem;
    font-family: Kyobo Handwriting;
`;

const Cheer = () => {
    const [cheer, setCheer] = useState();
    const [cheerState, setCheerState] = useState(true);
    const animation = useSpring({
        from: {
            opacity: 0,
            y: 10
        },
        to: {
            minHeight: cheerState ? '100px' : '0px',
            padding: cheerState ? '30px' : '0px',
            opacity: 0.5,
            y: 0
        }
    })

    const onClick = () => {
        setCheerState(!cheerState);
    }

    useEffect(() => {
        setCheer(CheerComment[Math.floor(Math.random() * CheerComment.length)])
    }, [])

    return (
        <Container style={animation}>
            <CloseBtn onClick={onClick} style={{color: cheerState ? 'black' : 'white'}} >
                {cheerState 
                ? <FontAwesomeIcon icon={faChevronUp} />
                : <FontAwesomeIcon icon={faChevronDown} />
                }
            </CloseBtn>
            {cheerState && <CheerPhrase>
                {cheer}
            </CheerPhrase>}
        </Container>
    )
}

export default Cheer;