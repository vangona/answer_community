import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const NoteFactory = () => {
    const onSubmit = e => {
        e.preventDefault();
    }
    return (
        <Container>
            NoteFactory
        </Container>
    )
}

export default NoteFactory;