import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { dbService } from "../fBase";

const Container = styled.div``;

const Welcome = styled(animated.div)`
    color: white;
    font-size: 1.2rem;
    text-align: center;
    line-height: 160%;
`;

const Farewell = styled.div`
    color: white;
    font-size: 1.2rem;
    text-align: center;
    line-height: 160%;
`;

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

const Manual = ({ userObj, refreshFirst }) => {
    const history = useHistory();
    const [page, setPage] = useState(-1);

    const animation = useSpring({
        from: {
            opacity: 0,
            y: 10
        },
        to: {
            opacity: 1,
            y: 0
        }
    })

    const onClickNext = () => {
        if (page < 15) setPage(page + 1);
    }

    const onClickPrev = () => {
        if (page > -1) setPage(page - 1);
    }

    const onClickStart = async () => {
        await dbService.collection("users").doc(`${userObj.uid}`).update({
            isFirst: false
        })
        refreshFirst(false);
        history.push("/");
    }

    return (
        <Container>
            {page === -1 && 
                <Welcome style={animation}>
                    안녕하세요! <br />
                    '누군가의 서랍장'에 오신 것을 <br />
                    환영합니다!
                </Welcome>
            }
            {page === 0 && 
                <Welcome style={animation}>
                    끝까지 보지 않고 시작하시려면 <br />
                    우측 상단의 '시작하기' 버튼을 <br />
                    눌러주세요. 감사합니다. <br />
                </Welcome>
            }
            {page > 14 &&
                <Farewell>
                    설명서는 설정 메뉴에서 <br />
                    언제든지 다시 보실 수 있습니다. <br />
                    감사합니다. 행복하시면 좋겠습니다 :)
                </Farewell>
            }
            <StartBtn style={{bottom: page === 15 && "-30%", right: page === 15 && "40%"}} onClick={onClickStart}>시작하기</StartBtn>
            {page !== -1 &&
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