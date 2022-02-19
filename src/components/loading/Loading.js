import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const LoadingBox = styled.div`
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    color: white;
    margin: 0 auto;
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

const Skew = keyframes`
    0% {
        transform: skew(0)
    }
    33% {
        transform: skew(-1deg)
    }
    66% {
        transform: skew(1deg)
    }
    100% {
        transform: skew(0)
    }
`;

const DotBlink = keyframes`
    0% {
        opacity: 0%;
    }
    20% {
        opacity: 0%;
    }
    40% {
        opacity: 100%;
    }
    60% {
        opacity: 100%;
    }
    80% {
        opacity: 100%;
    }
    100% {
        opacity: 100%
    }
`;

const Title = styled.h1`
    position: absolute;
    bottom: 60vh;
    display: flex;
    margin-bottom: 30px;
    font-family: Kyobo Handwriting;
`;

const Bulb = styled.img`
    position: absolute;
    height: 35vh;
    width: auto;
    top: 0;
    animation: ${Blink} 2s ease-in-out infinite;
`;

const Drawer = styled.img`
    position: absolute;
    animation: ${Skew} 2s ease-in-out infinite ;
    height: 35vh;
    width: auto;
    opacity: 80%;
    bottom: 25vh;
    object-fit: cover;
`;

const Dot = styled.div`
    animation: ${DotBlink} 2s infinite;
    :nth-child(2) {
        animation-delay: 0.5s;
    }
    :last-child {
        animation-delay: 1s;
    }
`;

const AnswerCount = styled.span`
    position: absolute;
    bottom: 15vh;
`;

const comment = [
    "서랍장 문여는 중", 
    "사람들이 쓴 답변 모으는 중", 
    "주인장이 편지 쓰는 중", 
    "서랍장 바닥 닦는 중", 
    "주인장이 몰래 먹던 야식 감추는 중", 
    "전구 닦는 중",
    "주인장 자세 잡는 중",
    "서랍장 손잡이 조정 중",
    "전구 밝기 조절 중",
    "명예의 전당 기록 중",
    "의자 높이 조정 중",
    ]

const Loading = () => {
    const [num, setNum] = useState("");
    const [answerCount, setAnswerCount] = useState('');

    useEffect(() => {
        localStorage.getItem("drawerAnswers") && setAnswerCount(JSON.parse(localStorage.getItem("drawerAnswers")));
        setNum(Math.floor(Math.random()*comment.length));
    }, [])

    return (
       <LoadingBox>
           <Bulb className="loading__bulb" src="https://cdn.jsdelivr.net/gh/vangona/answer_community/src/assets/img/loading_bulb.png" alt="" />
           <Title>
               {comment[num]}<Dot>.</Dot><Dot>.</Dot><Dot>.</Dot>
            </Title>
           <Drawer className="loading__drawer" src="https://cdn.jsdelivr.net/gh/vangona/answer_community/src/assets/img/loading_drawer.png" alt="" />
           <AnswerCount>지금까지 {answerCount}칸의 서랍장이 정리되었습니다.</AnswerCount>
       </LoadingBox>
    )
}

export default Loading;