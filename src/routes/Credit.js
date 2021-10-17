import { faBackward, faForward, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Sponsor } from "../components/DB/Sponsor";
import { useInterval } from "../hooks/UseInterval";
import { isMobile } from "react-device-detect";
import bgm from "../music/Soul and Mind - E's Jammy Jams.mp3"

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
    padding: 105vh 0;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const PlayBox = styled.button`
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 20px;
    opacity: 30%;
    background-color: transparent;
    border: none;
    transition: 1s all ease-in-out;
    :hover {
        opacity: 100%;
    }
`;

const PlayInput = styled.input`
  -webkit-appearance: none;
  margin-right: 15px;
  width: 100%;
  height: 6px;
  border-radius: 7px;
  background-size: 50% 100%;
  background-repeat: no-repeat;
  background-color: white;
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: white;
    cursor: ew-resize;
    box-shadow: 0 0 2px 0 #555;
    transition: background .3s ease-in-out;
  }
`;

const PlayBtnBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    gap: 5px;
`;

const PlayBtn = styled.button`
    background-color: transparent;
    border: none;
    color: white;
    transition: 1s all ease-in-out;
    :hover {
        cursor: pointer;
    }
`;

const Title = styled.h1`
    font-size: 1.5rem;
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

const Thankyou = styled.div`
    position: fixed;
    top: 40vh;
    color: white;
    transition: 1s all ease-in-out;
    width: 100%;
    text-align: center;
`;

const Credit = () => {
    const [init, setInit] = useState(false);
    const [speed, setSpeed] = useState(0);
    const [scroll, setScroll] = useState(0);
    const [commentState, setCommentState] = useState(false);
    const [bgmJazz] = useState(new Audio(bgm));
    let currentScroll;

    const onScrollChange = e => {
        e.preventDefault();
        setScroll(e.target.value)
        window.scrollTo(0, e.target.value);
    }

    const onClickBackward = e => {
        if (isMobile) {
            if (speed > -100) {
                setSpeed(speed - 10)
            }
        } else {
            if (speed > -10) {
                setSpeed(speed - 1)
            }
        }
    }

    const onClickPlay = e => {
        if (speed === 0) {
            if (!init) {
                setInit(true)
                setSpeed(isMobile ? 10 : 1)
                setTimeout(() => {
                    bgmJazz.play();
                }, 1000)
            } else {
                setSpeed(isMobile ? 10 : 1)
                bgmJazz.play();
            }
        } else if (speed !== 0) {
            setSpeed(0);
            bgmJazz.pause();
        }
    }

    const onClickForward = e => {
        if (isMobile) {
            if (speed < 100) {
                setSpeed(speed + 10)
            } 
        } else {
            if (speed < 10) {
                setSpeed(speed + 1)
            }
        }
    }

    useInterval(() => {
        if (speed !== 0 && window.scrollY + window.innerHeight + 1 <= document.body.scrollHeight) {
            scriptPlay();
        }
        if (window.scrollY + window.innerHeight + 100 >= document.body.scrollHeight) {
            setCommentState(true);
        } else {
            setCommentState(false);
        }
    }, 30)

    useInterval(() => {
        setScroll(window.scrollY)
    }, 500)

    const scriptPlay = () => {
        window.scrollBy({ top: `${speed}`, behavior: 'smooth'});
        currentScroll = window.scrollY;
    }

    useEffect(() => {
        return () => {
            clearInterval();
            bgmJazz.pause();
        }
    }, [])
    
    return (
        <Container>
            <PlayBox style={{bottom: init? "20px" : "50vh"}} >
                {init && 
                <PlayInput max={document.body.scrollHeight - window.innerHeight} min="0" value={window.scrollY} onChange={onScrollChange} type="range" />}
                <PlayBtnBox>
                    {init && <PlayBtn onClick={onClickBackward}>
                        <FontAwesomeIcon icon={faBackward} />
                    </PlayBtn>}
                    {speed === 0
                    ?
                    <PlayBtn style={{fontSize: !init && "30px"}} onClick={onClickPlay}>
                        <FontAwesomeIcon icon={faPlay} />
                    </PlayBtn>
                    : 
                    <PlayBtn onClick={onClickPlay}>
                        <FontAwesomeIcon icon={faPause} />
                    </PlayBtn>
                    }
                    {init && 
                    <PlayBtn onClick={onClickForward}>
                        <FontAwesomeIcon icon={faForward} />
                    </PlayBtn>}
                </PlayBtnBox>
            </PlayBox>
            <Title style={{opacity: !init && "0"}}>서랍장 명예의 전당</Title>
            <ThanksContainer style={{opacity: !init && "0"}}>
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
                <ThanksName>많은 도움을 준<Name>태일 형</Name></ThanksName>
                <ThanksName>창업 초기부터 많은 도움 주신<Name>허재경 대표님</Name></ThanksName>
                <ThanksName>SAYU PARTNER-S<Name>준성이형</Name></ThanksName>
                <ThanksName>사람에게 정 붙일 수 있게 도와준<Name>태훈이형</Name></ThanksName>
                <ThanksName>여러가지 정보들 주시고 응원해주신<Name>창업 동아리 선생님들</Name></ThanksName>
                <ThanksName>많은 동기부여 주신<Name>대표님들</Name></ThanksName>
                <ThanksName>응원해준<Name>친구들</Name></ThanksName>
                <ThanksName>저보고 할 수 있다고 해주신<Name>모든 분들</Name></ThanksName>
            </ThanksContainer>
            <Thankyou style={{opacity: commentState ? "100%" : "0%"}}>
                아직 무언가를 이뤄낸건 아니지만, 
                <Thankyou style={{marginTop: "30px", opacity: commentState ? "100%" : "0%", transitionDelay: "1s"}}>
                    덕분에 여기까지라도 올 수 있었습니다.
                </Thankyou>
                <Thankyou style={{marginTop: "60px", opacity: commentState ? "100%" : "0%", transitionDelay: "2s"}}>
                    정말 감사합니다. 행복하시면 좋겠습니다.
                </Thankyou>
                <Thankyou style={{marginTop: "90px", opacity: commentState ? "100%" : "0%", transitionDelay: "3s"}}>
                    서랍장 주인장 드림
                </Thankyou>
            </Thankyou>
        </Container>
    )
}

export default Credit;