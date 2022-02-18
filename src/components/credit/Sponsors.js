import React from 'react';
import styled from 'styled-components';
import { Sponsor } from "components/DB/Sponsor";

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
    font-size: 1.3rem;
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


const Sponsors = ({ init }) => {
    return (
        <ThanksContainer style={{opacity: !init && "0"}}>
        <ThanksTitle>후원해주신 분들</ThanksTitle>
        {Sponsor.sponsor["#1"].map((thinkperson, index) => (
            <ThanksName key={index}>
                <Comment>{thinkperson.comment}</Comment>
                <Name> 
                    - {thinkperson.writer} <White>님</White>
                </Name>
            </ThanksName>
        ))}
        {Sponsor.sponsor["#2"].map((thinkperson, index) => (
            <ThanksName key={index}>
                <Comment>{thinkperson.comment}</Comment>
                <Name> 
                    - {thinkperson.writer} <White>님</White>
                </Name>
            </ThanksName>
        ))}
        {Sponsor.sponsor["#3"].map((thinkperson, index) => (
            <ThanksName key={index}>
                <Comment>{thinkperson.comment}</Comment>
                <Name> 
                    - {thinkperson.writer} <White>님</White>
                </Name>
            </ThanksName>
        ))}
        {Sponsor.sponsor["#4"].map((thinkperson, index) => (
            <ThanksName key={index}>
                <Comment>{thinkperson.comment}</Comment>
                <Name> 
                    - {thinkperson.writer} <White>님</White>
                </Name>
            </ThanksName>
        ))}    
        {Sponsor.sponsor["#5"].map((thinkperson, index) => (
            <ThanksName key={index}>
                <Comment>{thinkperson.comment}</Comment>
                <Name> 
                    - {thinkperson.writer} <White>님</White>
                </Name>
            </ThanksName>
        ))}                            
    </ThanksContainer>
    );
};

export default Sponsors;