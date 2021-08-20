import { faBars, faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSpring, animated } from "react-spring"

const Container = styled(animated.div)`
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    height: auto;
    width: 80px;
    z-index: 9;
`;

const NavComponent = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 60px;
    color: white;
    padding-left: 20px;
    background-color: rgba(0,0,0, 0.2);
    opacity: 1;
    z-index: 9;
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

    const animation = useSpring({ opacity: navState ? 1 : 0 })

    const reverseAnimation = useSpring({ opacity: navState ? 0 : 1 })

    const onNavClick = () => {
        setNavState(!navState)
    }

    return(
        <>
            {navState ?(
            <Container style={animation}>
                <Link to={"/"} style={{textDecoration: "none"}}>
                    <NavComponent>
                        <FontAwesomeIcon icon={faHome} />__
                    </NavComponent>
                </Link>
                <Link to={"/questions"} style={{textDecoration: "none"}}>
                    <NavComponent>Q __</NavComponent>
                </Link>
                <Link to={"/myanswers"} style={{textDecoration: "none"}}>
                    <NavComponent>A __</NavComponent>
                </Link> 
                <NavCloseBtn style onClick={onNavClick}>
                    <FontAwesomeIcon icon={faChevronRight} />
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