import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Sponsor } from "../components/DB/Sponsor";
import { useInterval } from "../hooks/UseInterval";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
    justify-content: center;
    align-items: center;
    background-color: black;
    width: 100%;
    overflow-y: scroll;
    color: white;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const PlayInput = styled.input``;

const PlayBtn = styled.button`
    position: fixed;
    top: 0;
    left: 0;
`;

const Title = styled.h1`
    font-size: 24px;
    margin-top: 100vh;
    color: var(--gold);
`;

const ThanksContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 10px;
    justify-content: center;
    align-items: center;
    height: auto;
`;

const ThanksTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 10px;
`;

const ThanksName = styled.h3`
    width: 90%;
    flex-wrap: wrap;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;

const Comment = styled.div`
    word-break: keep-all;
    line-height: 160%;
`;

const Name = styled.h3`
    color: var(--gold);
`;

const Credit = () => {
    const [play, setPlay] = useState(10);
    const [speed, setSpeed] = useState(10);

    const onClickPlay = (e) => {
        e.preventDefault();
        if (play === 0) {
            setPlay(10)
        } else if (play === 10) {
            setPlay(0) 
        }
    }

    const onSpeedChange = e => {
        e.preventDefault();
        setSpeed(e.target.value);
    }

    useInterval(() => {
        scriptPlay();
    }, 10)

    const scriptPlay = () => {
        let currentScroll;  
        if (window.scrollY !== currentScroll) {
            window.scrollBy({ top: speed, behavior: 'smooth'});
            currentScroll = window.scrollY;
        }
    }

    return (
        <Container>
            <PlayBtn onClick={onClickPlay}>
            <PlayInput max="100" min="0" onChange={onSpeedChange} type="range" />
                재생
            </PlayBtn>
            <Title>서랍장 명예의 전당</Title>
            <ThanksContainer>
                <ThanksTitle>도움을 주신 분들</ThanksTitle>
                <ThanksName>수석 디자이너 <Name>경민이</Name></ThanksName>
                <ThanksName>사진, 아이디어를 짜는데 많은 도움이 되어준 <Name>영민이</Name></ThanksName>
                <ThanksName>창업 초기부터 많은 도움을 준 <Name>태일 형</Name></ThanksName>
            </ThanksContainer>
            <ThanksContainer>
                <ThanksTitle>생각을 함께 나눠주신 분들</ThanksTitle>
                {Sponsor.thinkShare.map(thinkperson => (
                    <ThanksName>
                    <Name>{thinkperson}</Name>님
                    </ThanksName>
                ))}
            </ThanksContainer>
            <ThanksContainer>
                <ThanksTitle>후원해주신 분들</ThanksTitle>
                {Sponsor.sponsor["#1"].map(thinkperson => (
                    <ThanksName>
                        <Comment>{thinkperson.comment}</Comment>
                        <Name> - {thinkperson.writer} 님</Name>
                    </ThanksName>
                ))}
                {Sponsor.sponsor["#2"].map(thinkperson => (
                    <ThanksName>
                        <Comment>{thinkperson.comment}</Comment>
                        <Name> - {thinkperson.writer} 님</Name>
                    </ThanksName>
                ))}
                {Sponsor.sponsor["#3"].map(thinkperson => (
                    <ThanksName>
                        <Comment>{thinkperson.comment}</Comment>
                        <Name> - {thinkperson.writer} 님</Name>
                    </ThanksName>
                ))}
                {Sponsor.sponsor["#4"].map(thinkperson => (
                    <ThanksName>
                        <Comment>{thinkperson.comment}</Comment>
                        <Name> - {thinkperson.writer} 님</Name>
                    </ThanksName>
                ))}    
                {Sponsor.sponsor["#5"].map(thinkperson => (
                    <ThanksName>
                        <Comment>{thinkperson.comment}</Comment>
                        <Name> - {thinkperson.writer} 님</Name>
                    </ThanksName>
                ))}                            
            </ThanksContainer>
        </Container>
    )
}

export default Credit;