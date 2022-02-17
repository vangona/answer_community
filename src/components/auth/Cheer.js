import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { CheerComment } from "components/DB/CheerDB";

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
    top: 5px;
    right: 10px;
    border: none;
    background: transparent;
    color: white;
    transition: all 0.3s ease-in-out;
    :hover {
        cursor: pointer;
        color: var(--gold);
    }
`;

const RefreshBtn = styled.button`
    position: absolute;
    bottom: 10px;
    left: 10px;
    border: none;
    background: transparent;
    color: black;
    transition: all 0.3s ease-in-out;
    :hover {
        cursor: pointer;
        color: var(--gold);
    }
`;

const CheerPhrase = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 90%;
    word-break: keep-all;
    line-height: 25px;
    font-size: 0.9rem;
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
            opacity: 0.7,
            y: 0
        }
    })

    const onClick = () => {
        setCheerState(!cheerState);
    }

    const onClickRefresh = () => {
        setCheer(CheerComment[Math.floor(Math.random() * CheerComment.length)])
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
            {cheerState && 
            <>
                <CheerPhrase>
                    {cheer}
                </CheerPhrase>
                <RefreshBtn onClick={onClickRefresh}>
                    <FontAwesomeIcon icon={faSyncAlt} />
                </RefreshBtn>
            </>
            }
        </Container>
    )
}

export default Cheer;