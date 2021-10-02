import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import styled, { keyframes } from "styled-components";
import bulb from "../img/loading_bulb.png"
import drawer from "../img/loading_drawer.png"

const LoadingBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: white;
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
    display: flex;
    font-family: Kyobo Handwriting;
`;

const Bulb = styled.img`
    width: 80%;
    animation: ${Blink} 2s ease-in-out infinite;
`;

const Drawer = styled.img`
    animation: ${Skew} 2s ease-in-out infinite ;
    width: 80%;
    opacity: 80%;
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
    useEffect(() => {
        setNum(Math.floor(Math.random()*comment.length))
    }, [])
    return (
       <LoadingBox>
           <Title>
               {comment[num]}<Dot>.</Dot><Dot>.</Dot><Dot>.</Dot>
            </Title>
           <Bulb class="loading__bulb" src={bulb} />
           <Drawer class="loading__drawer" src={drawer} />
       </LoadingBox>
    )
}

export default Loading;