import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;

const ManualPic = styled.img`
    height: 100vh;
`;

const Page = styled.span`
    position: fixed;
    bottom: 20px;
    left: 45%;
    right: 45%;
    background: none;
    color: white;
    border: none;
    font-size: 1rem;
    transition: all 0.5s ease-in-out;
    font-family: Kyobo Handwriting;
    width: 10%;
`;

const StartBtn = styled.button`
    position: fixed;
    top: 20px;
    right: 15px;
    background: none;
    color: white;
    border: none;
    font-size: 1rem;
    transition: all 0.5s ease-in-out;
    font-family: Kyobo Handwriting;
    :hover {
        cursor: pointer;
        color: var(--gold);
    }
`;

const NextBtn = styled.button`
    position: fixed;
    top: 50%;
    right: 10px;
    background: none;
    color: white;
    border: none;
    font-size: 1.2rem;
    transition: all 0.5s ease-in-out;
    :hover {
        cursor: pointer;
        color: var(--gold);
    }
`;

const PrevBtn = styled.button`
    position: fixed;
    top: 50%;
    left: 10px;
    background: none;
    color: white;
    border: none;
    font-size: 1.2rem;
    transition: all 0.5s ease-in-out;
    :hover {
        cursor: pointer;
        color: var(--gold);
    }
`;

const Manual = () => {
    const history = useHistory();
    const [page, setPage] = useState(0);

    const onClickNext = () => {
        if (page < 15) setPage(page + 1);
    }

    const onClickPrev = () => {
        if (page > 0) setPage(page - 1);
    }

    const onClickStart = () => {
        history.push("/");
    }

    return (
        <Container>
            <StartBtn onClick={onClickStart}>시작하기</StartBtn>
            {page !== 0 &&
                <PrevBtn onClick={onClickPrev}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </PrevBtn>
            }
            {page !== 15 &&
                <NextBtn onClick={onClickNext}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </NextBtn>
            }
            {page > 0 && page < 15 &&
                <>
                    <ManualPic src={`https://cdn.jsdelivr.net/gh/vangona/answer_community/src/img/manual/${page}.jpg`} alt="" />
                    <Page>{`${page} / 14`}</Page>
                </>
            }
        </Container>
    );
};

export default Manual;