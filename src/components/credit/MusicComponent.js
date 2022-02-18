import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { faBackward, faForward, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isMobile } from "react-device-detect";
import { useInterval } from "components/hooks/UseInterval";
import bgm from "assets/music/Soul and Mind - E's Jammy Jams.mp3";

const PlayBox = styled.button`
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 20px;
    opacity: 30%;
    background-color: transparent;
    border: none;
    transition: 1s all ease-in-out;
    z-index: 9;
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

const MusicComponent = ({init, setInit, setCommentState}) => {
    const [speed, setSpeed] = useState(0);
    const [scroll, setScroll] = useState(0);
    const [bgmJazz] = useState(new Audio(bgm));

    const onScroll = e => {
        setSpeed(0);
    }

    const onScrollChange = e => {
        e.preventDefault();
        setScroll(e.target.value);
        window.scrollTo(0, e.target.value);
    }

    const scriptPlay = () => {
        window.scrollBy({ top: `${speed}`, behavior: 'smooth'});
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
        } else {
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

    useInterval(() => {
        if (!bgmJazz.paused && speed < 1) {
            setSpeed(speed + 0.1);
        }

        if (speed !== 0 && window.scrollY + window.innerHeight + 1 <= document.body.scrollHeight) {
            scriptPlay();
            setScroll(window.screenY);
        }

        if (window.scrollY + window.innerHeight + 100 >= document.body.scrollHeight) {
            setCommentState(true);
        } else {
            setCommentState(false);
        }
    }, 30)

    useEffect(() => {
        document.addEventListener('wheel', onScroll);
        return () => {
            clearInterval();
            bgmJazz.pause();
        }
    }, [])

    return (
        <PlayBox style={{bottom: init? "20px" : "50vh"}} >
        {init && 
            <PlayInput 
                max={document.body.scrollHeight - window.innerHeight}
                min="0" 
                value={window.scrollY} 
                onChange={onScrollChange} type="range" 
            />}
            <PlayBtnBox>
                {init && 
                    <PlayBtn onClick={onClickBackward}>
                        <FontAwesomeIcon icon={faBackward} />
                    </PlayBtn>
                }
                {speed === 0 ? (
                    <PlayBtn style={{fontSize: !init && "30px"}} onClick={onClickPlay}>
                        <FontAwesomeIcon icon={faPlay} />
                    </PlayBtn>
                ) : ( 
                    <PlayBtn onClick={onClickPlay}>
                        <FontAwesomeIcon icon={faPause} />
                    </PlayBtn>
                )}
                {init && 
                    <PlayBtn onClick={onClickForward}>
                        <FontAwesomeIcon icon={faForward} />
                    </PlayBtn>
                }
            </PlayBtnBox>
        </PlayBox>
    );
};

export default MusicComponent;