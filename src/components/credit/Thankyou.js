import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    top: 40vh;
    color: white;
    transition: 1s all ease-in-out;
    width: 100%;
    text-align: center;
`;

const Thankyou = ({ commentState }) => {
    return (
        <>
            <Container style={{opacity: commentState ? "100%" : "0%"}}>
            아직 무언가를 이뤄낸건 아니지만, 
            </Container>
            <Container style={{marginTop: "30px", opacity: commentState ? "100%" : "0%", transitionDelay: "1s"}}>
                덕분에 여기까지라도 올 수 있었습니다.
            </Container>
            <Container style={{marginTop: "60px", opacity: commentState ? "100%" : "0%", transitionDelay: "2s"}}>
                정말 감사합니다. 행복하시면 좋겠습니다.
            </Container>
            <Container style={{marginTop: "90px", opacity: commentState ? "100%" : "0%", transitionDelay: "3s"}}>
                서랍장 주인장 드림
            </Container>
        </>
    );
};

export default Thankyou;