import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ErrorComment } from "components/DB/ErrorDB";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 95vh;
    gap: 15px;
`;

const Pic = styled.img`
    width: 50%;
`;

const Notice = styled.div`
    font-family: Kyobo Handwriting;
    color: white;
    text-align: center;
    line-height: 160%;
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

const ErrorPage = () => {
    const [error, setError] = useState();

    const onClick = () => {
        window.location.replace("/")
    }

    useEffect(() => {
        setError(ErrorComment[Math.floor(Math.random() * ErrorComment.length)])
    }, [])

    return (
        <Container>
            <Pic src="https://cdn.jsdelivr.net/gh/vangona/answer_community/src/assets/img/error_mouse.png" />
            <Notice>
                {error} {<br />}
                에러가 주인장에게 전달되었습니다. <br/>
            </Notice>
            <BackBtn onClick={onClick}>
                나의 서랍장으로 돌아가기
            </BackBtn>
        </Container>
    )
}

export default ErrorPage;