import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import { ErrorComment } from "./DB/ErrorDB";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 95vh;
    gap: 15px;
`;

const Pic = styled.div``;

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
            <Notice>
                {error} {<br />}
                에러는 주인장에게 전달되었습니다 :)
            </Notice>
            <BackBtn onClick={onClick}>
                나의 서랍장으로 돌아가기
            </BackBtn>
        </Container>
    )
}

export default ErrorPage;