import React from "react";
import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const Blink = keyframes`
    0% {
        opacity: 100%;
    }
    50% {
        opacity: 30%;
    }
    100% {
        opacity: 100%;
    }
`;

const Bulb = styled.img`
    position: absolute;
    height: 35vh;
    width: auto;
    top: 0;
    animation: ${Blink} 2s ease-in-out infinite;
`;

const Notice = styled.span`
    color: white;
`;

const BackBtn = styled.button`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 0.7rem;
    border-radius: 15px;
    padding: 5px 10px;
    border: 1px solid rgba(255,255,255,0.5);
    color: white;
    background-color: transparent;
    font-family: Kyobo Handwriting;
    transition: 0.5s all ease-in-out;
    text-decoration: none;
    :hover {
        cursor: pointer;
        border: 1px solid var(--gold);
        color: var(--gold);
    }
`;

const NotFound = () => {
    const history = useHistory();

    return (
        <Container>
           <Bulb class="loading__bulb" src="https://cdn.jsdelivr.net/gh/vangona/answer_community/src/img/loading_bulb.png" alt="" />
           <Notice>
               이 칸에는 아무 것도 없네요!
           </Notice>
           <BackBtn onClick={() => {history.goBack()}}>
                나의 서랍장으로 돌아가기
            </BackBtn>
        </Container>
    )
}

export default NotFound;