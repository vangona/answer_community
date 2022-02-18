import { Sponsor } from 'components/DB/Sponsor';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
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

const Name = styled.h3`
    display: flex;
    color: var(--gold);
`;

const ThinkGivers = ({ init }) => {
    return (
        <Container style={{opacity: !init && "0"}}>
            <ThanksTitle>생각을 함께 나눠주신 분들</ThanksTitle>
            {Sponsor.thinkShare.map((thinkperson, index) => (
                <ThanksName key={index}>
                    <Name>{thinkperson}</Name>님
                </ThanksName>
            ))}
        </Container>
    );
};

export default ThinkGivers;