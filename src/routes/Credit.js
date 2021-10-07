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
    padding: 100vh 0;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const PlayInput = styled.input``;

const PlayBox = styled.button`
    display: flex;
    position: fixed;
    bottom: 20px;
    opacity: 50%;
    transition: 0.5s all ease-in-out;
    :hover {
        opacity: 100%;
    }
`;

const Title = styled.h1`
    font-size: 24px;
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
    width: 100%;
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
    display: flex;
    color: var(--gold);
`;

const White = styled.h3`
    color: white;
    margin-left: 5px;
`;

const Credit = () => {
    const [speed, setSpeed] = useState(1);
    let currentScroll;

    const onSpeedChange = e => {
        e.preventDefault();
        setSpeed(e.target.value);
        console.log(e.target.value)
    }

    useInterval(() => {
        scriptPlay();
    }, 30)

    const scriptPlay = () => {
        if (window.scrollY !== currentScroll) {
            window.scrollBy({ top: speed, behavior: 'smooth'});
            currentScroll = window.scrollY;
        }
    }

    return (
        <Container>
            <PlayBox>
            <PlayInput max="10" min="0" value={speed} step="0.1" onChange={onSpeedChange} type="range" />
            </PlayBox>
            <Title>서랍장 명예의 전당</Title>
            <ThanksContainer>
                <ThanksTitle>후원해주신 분들</ThanksTitle>
                {Sponsor.sponsor["#1"].map(thinkperson => (
                    <ThanksName>
                        <Comment>{thinkperson.comment}</Comment>
                        <Name> 
                            - {thinkperson.writer} 
                            <White>
                             님
                            </White>
                        </Name>
                    </ThanksName>
                ))}
                {Sponsor.sponsor["#2"].map(thinkperson => (
                    <ThanksName>
                        <Comment>{thinkperson.comment}</Comment>
                        <Name> 
                            - {thinkperson.writer} 
                            <White>
                             님
                            </White>
                        </Name>
                    </ThanksName>
                ))}
                {Sponsor.sponsor["#3"].map(thinkperson => (
                    <ThanksName>
                        <Comment>{thinkperson.comment}</Comment>
                        <Name> 
                            - {thinkperson.writer} 
                            <White>
                             님
                            </White>
                        </Name>
                    </ThanksName>
                ))}
                {Sponsor.sponsor["#4"].map(thinkperson => (
                    <ThanksName>
                        <Comment>{thinkperson.comment}</Comment>
                        <Name> 
                            - {thinkperson.writer} 
                            <White>
                             님
                            </White>
                        </Name>
                    </ThanksName>
                ))}    
                {Sponsor.sponsor["#5"].map(thinkperson => (
                    <ThanksName>
                        <Comment>{thinkperson.comment}</Comment>
                        <Name> 
                            - {thinkperson.writer} 
                            <White>
                             님
                            </White>
                        </Name>
                    </ThanksName>
                ))}                            
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
                <ThanksTitle>도움을 주신 분들</ThanksTitle>
                <ThanksName>수석 디자이너 <Name>경민이</Name></ThanksName>
                <ThanksName>창동관 이웃<Name>영민이</Name></ThanksName>
                <ThanksName>많은 도움을 준 <Name>태일 형</Name></ThanksName>
            </ThanksContainer>
        </Container>
    )
}

export default Credit;