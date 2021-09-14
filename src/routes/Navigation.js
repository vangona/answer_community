import { faBars, faChevronUp, faCog, faDoorOpen, faEdit, faHome, faQuestion, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring"
import { authService } from "../fBase";

const Container = styled(animated.div)`
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    width: 100vw;
    height: auto;
    z-index: 9;
    box-sizing: border-box;
    background-color: rgba(0,0,0, 0.2);
`;

const NavComponent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    color: white;
    opacity: 1;
    z-index: 9;
    :hover {
        cursor: pointer;
    }
`;

const NavBtn = styled(animated.button)`
    position: fixed;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: 0;
    opacity: 1;
    z-index: 9;
    color: white;
    :hover {
        cursor: pointer;
    }
`;

const NavCloseBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    margin: 10px;
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
        y: navState ? 0 : -10,
        reverse: !navState,
        config: config.default,
    })

    const reverseAnimation = useSpring({
        opacity : navState ? 0 : 1, 
        y: navState ? -10 : 0,
        reverse: navState,
        config: config.default,
    })

    const onNavClick = () => {
        setNavState(!navState)
    }

    const onClickLogout = () => {
        authService.signOut();
    }

    return(
        <>
            {navState ?(
            <Container style={animation}>
                <Link to={"/"} style={{textDecoration: "none", marginLeft: "20px"}}>
                    <NavComponent>
                        <FontAwesomeIcon icon={faHome} />
                    </NavComponent>
                </Link>
                <Link to={"/community"} style={{textDecoration: "none"}}>
                    <NavComponent>
                        <FontAwesomeIcon icon={faUserFriends} />
                    </NavComponent>
                </Link> 
                <Link to={"/questions"} style={{textDecoration: "none"}}>
                    <NavComponent>
                        <FontAwesomeIcon icon={faQuestion} />
                    </NavComponent>
                </Link>
                <Link to={"/myanswers"} style={{textDecoration: "none"}}>
                    <NavComponent>
                    <FontAwesomeIcon icon={faEdit} />
                    </NavComponent>
                </Link> 
                <Link to={"/settings"} style={{textDecoration: "none"}}>
                    <NavComponent>
                        <FontAwesomeIcon icon={faCog} />
                    </NavComponent>
                </Link> 
                <NavComponent onClick={onClickLogout}>
                    <FontAwesomeIcon icon={faDoorOpen} />
                </NavComponent>
                <NavCloseBtn style onClick={onNavClick}>
                    <FontAwesomeIcon icon={faChevronUp} />
                </NavCloseBtn>
            </Container>
            ) : (
            <NavBtn style={reverseAnimation} onClick={onNavClick}>
                <FontAwesomeIcon icon={faBars} size="lg" />
            </NavBtn>
            )}
        </>
    )
};

export default Navigation;