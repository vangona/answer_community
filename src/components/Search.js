import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  height: 75px;
  width: 100%;
  padding: 10px 0;
  transition: 0.3s all ease-in-out;
  background-color: rgba(0,0,0,0.3);
  :hover, :focus-within {
    font-style: italic;
    background-color: var(--main-color);
  }
`;

const Title = styled.h1`  
  font-family: Kyobo Handwriting;
  font-size: 14px;
  color: var(--gold);
  margin-bottom: 20px;
  transition: 0.3s all ease-in-out;
`;

const SearchInput = styled.input`
  width: 200px;
  transition: 0.3s all ease-in-out;
  :focus {
    border-radius: 10px;
  }
`;

const Search = ({ searchWord, setSearchWord }) => {
    const onChange = (e) => {
      setSearchWord(e.target.value)      
    }
    return (
      <Container>
        <Title>찾으시는 질문이 있나요?</Title>
        <SearchInput onChange={onChange} value={searchWord} />
      </Container>
    );
}
  
export default Search;
  