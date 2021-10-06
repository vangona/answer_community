import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Sponsor } from "../components/DB/Sponsor";

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
    display: flex;
    gap: 10px;
`;

const Name = styled.h3`
    color: var(--gold);
`;

const Credit = () => {

    useEffect(() => {            
        let currentScroll;
        setInterval(() => {
            if (window.scrollY !== currentScroll) {
                window.scrollBy({ top: 10, behavior: 'smooth', duration: 100 });
                currentScroll = window.scrollY;
            }
        }, 10)
    })

    return (
        <Container>
            <Title>서랍장 명예의 전당</Title>
            <ThanksContainer>
                <ThanksTitle>도움을 주신 분들</ThanksTitle>
                <ThanksName>수석 디자이너 <Name>경민이</Name></ThanksName>
                <ThanksName>사진, 아이디어를 짜는데 많은 도움이 되어준 <Name>영민이</Name></ThanksName>
                <ThanksName>창업 초기부터 많은 도움을 준 <Name>태일 형</Name></ThanksName>
            </ThanksContainer>
            <ThanksContainer>
                <ThanksTitle>후원해주신 분들</ThanksTitle>
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
        </Container>
    )
}

export default Credit;