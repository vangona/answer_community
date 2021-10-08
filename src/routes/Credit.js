import { faBackward, faForward, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Sponsor } from "../components/DB/Sponsor";
import { useInterval } from "../hooks/UseInterval";
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
    padding: 100vh 0;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const PlayBox = styled.button`
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 20px;
    opacity: 50%;
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
    font-size: 24px;
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
    font-size: 20px;
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

const Credit = () => {
    const [init, setInit] = useState(false);
    const [speed, setSpeed] = useState(0);
    let currentScroll;
    const [bgmJazz] = useState(new Audio(bgm));

    const onSpeedChange = e => {
        e.preventDefault();
        setSpeed(e.target.value);
        console.log(e.target.value)
    }

    const onClickBackward = e => {
        if (speed > -10) {
            setSpeed(speed - 1)
        }
    }

    const onClickPlay = e => {
        if (speed === 0) {
            if (!init) {
                setInit(true)
                setSpeed(1)
                setTimeout(() => {
                    bgmJazz.play();
                }, 1000)
            } else {
                setSpeed(1)
                bgmJazz.play();
            }
        } else if (speed !== 0) {
            setSpeed(0);
            bgmJazz.pause();
        }
    }

    const onClickForward = e => {
        if (speed < 10) {
            setSpeed(speed + 1)
        }
    }

    useInterval(() => {
        scriptPlay();
    }, 30)

    const scriptPlay = () => {
        if (window.scrollY !== currentScroll) {
            window.scrollBy({ top: speed, behavior: 'smooth'});
            currentScroll = window.scrollY;
        }
    }

    useEffect(() => {
    }, [])
    
    return (
        <Container>
            <PlayBox style={{bottom: init? "20px" : "50vh"}} >
                {init && 
                <PlayInput max="10" min="-10" value={speed}onChange={onSpeedChange} type="range" />}
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
            <Title>서랍장 명예의 전당</Title>
            <ThanksContainer>
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
                <ThanksName>많은 도움을 준 <Name>태일 형</Name></ThanksName>
            </ThanksContainer>
        </Container>
    )
}

export default Credit;