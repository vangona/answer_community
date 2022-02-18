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

const ThanksFor = styled.h3`
    width: 90%;
    flex-wrap: wrap;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;

const Title = styled.h2`
    font-size: 1.3rem;
    margin-bottom: 10px;
`;

const Name = styled.h3`
    display: flex;
    color: var(--gold);
`;

const SpecialThanksTo = ({ init }) => {
    return (
        <Container style={{opacity: !init && "0"}}>
            <Title>도움을 주신 분들</Title>
            <ThanksFor>
                수석 디자이너 <Name>경민이</Name>
            </ThanksFor>
            <ThanksFor>
                창동관 이웃<Name>영민이</Name>
                </ThanksFor>
            <ThanksFor>
                많은 도움을 준<Name>태일 형</Name>
            </ThanksFor>
            <ThanksFor>
                창업 초기부터 많은 도움 주신<Name>허재경 대표님</Name>
            </ThanksFor>
            <ThanksFor>
                SAYU PARTNER-S<Name>준성이형</Name>
            </ThanksFor>
            <ThanksFor>
                사람에게 정 붙일 수 있게 도와준<Name>태훈이형</Name>
            </ThanksFor>
            <ThanksFor>
                여러가지로 도와주시고 응원해주신<Name>창업 동아리 선생님들</Name>
            </ThanksFor>
            <ThanksFor>많은 동기부여 주신<Name>대표님들</Name>
            </ThanksFor>
            <ThanksFor>
                응원해준<Name>친구들</Name>
            </ThanksFor>
            <ThanksFor>
                저보고 할 수 있다고 해주신<Name>모든 분들</Name>
            </ThanksFor>
        </Container>
    );
};

export default SpecialThanksTo;