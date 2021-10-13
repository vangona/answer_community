import { faBars, faChevronLeft, faChevronRight, faChevronUp, faCog, faDoorOpen, faEdit, faHome, faInbox, faQuestion, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring"
import { authService } from "../fBase";

const Container = styled(animated.div)`
    position: fixed;
    bottom: -10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: auto;
    z-index: 9;
    box-sizing: border-box;
    background-color: rgba(0,0,0, 0.5);
`;

const NavComponent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50px;
    color: white;
    gap: 5px;
    opacity: 1;
    z-index: 9;
    font-size: 16px;
    :hover {
        cursor: pointer;
    }
`;

const NavTitle = styled.span`
    font-size: 0.5rem;
`;

const NavBtn = styled(animated.button)`
    position: fixed;
    bottom: 15px;
    left: 15px;
    background-color: transparent;
    border: 0;
    opacity: 1;
    z-index: 9;
    color: white;
    font-family: sans-serif;
    font-weight: bolder;
    :hover {
        cursor: pointer;
    }
`;

const NavCloseBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    margin-right: 5%;
    z-index: 9;
    color: white;
    :hover {
        cursor: pointer;
    }
`;

const Navigation = () => {
    const [navState, setNavState] = useState(false);

    const animation = useSpring({
        opacity : navState ? 1 : 0, 
        x: navState ? 0 : -10,
        reverse: !navState,
        config: config.default,
    })

    const reverseAnimation = useSpring({
        opacity : navState ? 0 : 1, 
        x: navState ? -10 : 0,
        reverse: navState,
        config: config.default,
    })

    const onNavClick = () => {
        setNavState(!navState)
    }

    return(
        <>
            {navState ?(
            <Container style={animation}>
                <Link to={"/"} style={{textDecoration: "none", marginLeft: "5%"}}>
                    <NavComponent>
                        <FontAwesomeIcon icon={faHome} />
                        <NavTitle>홈</NavTitle>
                    </NavComponent>
                </Link>
                <Link to={"/questions"} style={{textDecoration: "none"}}>
                    <NavComponent>
                    <FontAwesomeIcon icon={faEdit} />
                    <NavTitle>답변쓰기</NavTitle>
                    </NavComponent>
                </Link>
                <Link to={"/myanswers"} style={{textDecoration: "none"}}>
                    <NavComponent>
                    <FontAwesomeIcon icon={faInbox} />
                    <NavTitle>나만의 서랍장</NavTitle>
                    </NavComponent>
                </Link> 
                <Link to={"/community"} style={{textDecoration: "none"}}>
                    <NavComponent>
                        <FontAwesomeIcon icon={faUserFriends} />
                        <NavTitle>누군가의 서랍장</NavTitle>
                    </NavComponent>
                </Link> 
                <Link to={"/settings"} style={{textDecoration: "none"}}>
                    <NavComponent>
                        <FontAwesomeIcon icon={faCog} />
                        <NavTitle>설정</NavTitle>
                    </NavComponent>
                </Link> 
                <NavCloseBtn style onClick={onNavClick}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </NavCloseBtn>
            </Container>
            ) : (
            <NavBtn style={reverseAnimation} onClick={onNavClick}>
                Menu<FontAwesomeIcon icon={faChevronRight} style={{marginLeft: "5px"}} />
            </NavBtn>
            )}
        </>
    )
};

export default Navigation;