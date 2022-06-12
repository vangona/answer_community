import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { faBackward, faForward, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isMobile } from "react-device-detect";
import bgm from "assets/music/Soul and Mind - E's Jammy Jams.mp3";
import _ from "lodash";

// styled-components
// Play Controller 컨테이너
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

// Play Controller Scroll Input
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
    transition: background 0.3s ease-in-out;
  }
`;

// Play 버튼 컨테이너
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

const MusicComponent = ({ init, setInit, setCommentState }) => {
  // cancelAnimationFrame을 위해 id값을 useRef로 가져와준다.
  const animationRef = useRef();
  const scrollSpeed = useRef();
  const [animationState, setAnimationState] = useState(false);
  const [bgmJazz] = useState(new Audio(bgm));

  // 스크롤 속도 관련 상수
  const ScrollSpeedConstants = {
    desktopDefault: 1,
    desktopMax: 5,
    desktopMin: -5,
    mobileDefault: 1,
    mobileMax: 5,
    mobileMin: -5,
  };

  // scrollSpeed 초기값 설정.
  scrollSpeed.current = isMobile ? ScrollSpeedConstants.mobileDefault : ScrollSpeedConstants.desktopDefault;

  // Play Controller Scroll Input 이벤트.
  const onScrollChange = (e) => {
    e.preventDefault();
    window.scrollTo(0, e.target.value);
  };

  // 재생 버튼 클릭 이벤트
  // animation state 변경,
  // autoScroll 호출,
  // bgm 재생.
  const onClickPlay = () => {
    setAnimationState(true);
    animationRef.current = requestAnimationFrame(autoScroll);

    if (!init) {
      setInit(true);
      setTimeout(() => {
        bgmJazz.play();
      }, 1000);
    } else {
      bgmJazz.play();
    }
  };

  // 일시정지 버튼 클릭 이벤트
  // animation state 변경,
  // anumationID로 animationFrame 정지.
  // bgm 정지.
  const onClickPause = () => {
    setAnimationState(false);
    cancelAnimationFrame(animationRef.current);
    bgmJazz.pause();
  };

  const onClickForward = () => {
    if (isMobile) {
      if (scrollSpeed.current < ScrollSpeedConstants.mobileMax) {
        scrollSpeed.current += ScrollSpeedConstants.mobileDefault;
      }
    } else {
      if (scrollSpeed.current < ScrollSpeedConstants.desktopMax) {
        scrollSpeed.current += ScrollSpeedConstants.desktopDefault;
      }
    }
  };

  const onClickBackward = () => {
    if (isMobile) {
      if (scrollSpeed.current > ScrollSpeedConstants.mobileMin) {
        scrollSpeed.current -= ScrollSpeedConstants.mobileDefault;
      }
    } else {
      if (scrollSpeed.current > ScrollSpeedConstants.desktopMin) {
        scrollSpeed.current -= ScrollSpeedConstants.desktopDefault;
      }
    }
  };

  function autoScroll() {
    if (window.scrollY + window.innerHeight + 1 <= document.body.scrollHeight) {
      window.scrollBy(0, scrollSpeed.current);
    }

    if (window.scrollY + window.innerHeight + 100 >= document.body.scrollHeight) {
      setCommentState(true);
    } else {
      setCommentState(false);
    }

    animationRef.current = requestAnimationFrame(autoScroll);
  }

  useEffect(() => {
    return () => {
      onClickPause();
    };
  }, []);

  return (
    <PlayBox style={{ bottom: init ? "20px" : "50vh" }}>
      {init && (
        <PlayInput
          max={document.body.scrollHeight - window.innerHeight}
          min="0"
          value={window.scrollY}
          onChange={onScrollChange}
          type="range"
        />
      )}
      <PlayBtnBox>
        {init && (
          <PlayBtn onClick={onClickBackward}>
            <FontAwesomeIcon icon={faBackward} />
          </PlayBtn>
        )}
        {!animationState ? (
          <PlayBtn style={{ fontSize: !init && "30px" }} onClick={onClickPlay}>
            <FontAwesomeIcon icon={faPlay} />
          </PlayBtn>
        ) : (
          <PlayBtn onClick={onClickPause}>
            <FontAwesomeIcon icon={faPause} />
          </PlayBtn>
        )}
        {init && (
          <PlayBtn onClick={onClickForward}>
            <FontAwesomeIcon icon={faForward} />
          </PlayBtn>
        )}
      </PlayBtnBox>
    </PlayBox>
  );
};

export default MusicComponent;
