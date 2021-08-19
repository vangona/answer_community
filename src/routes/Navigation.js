import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    position: fixed;
    bottom: 0;
    display: flex;
    height: 50px;
    width: 100%;
    background-color: gray;
`;

const NavComponent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    width: 100%;
    height: 100%;
    color: black;
`;

const Navigation = () => {
    return(
        <Container>
            <Link to={"/"} style={{width: "33.3%", textDecoration: "none"}}>
                <NavComponent>Home</NavComponent>
            </Link>
            <Link to={"/questions"} style={{width: "33.3%", textDecoration: "none"}}>
                <NavComponent>Questions</NavComponent>
            </Link>
            <Link to={"/myanswers"} style={{width: "33.3%", textDecoration: "none"}}>
                <NavComponent>My Answers</NavComponent>
            </Link>
        </Container>
    )
};

export default Navigation;