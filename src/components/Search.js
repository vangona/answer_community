import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  height: 120px;
  width: 100%;
  padding: 10px 0;
  transition: 0.3s all ease-in-out;
  background-color: var(--main-color);
  :hover, :focus-within {
    font-style: italic;
  }
`;

const Title = styled.h1`  
  font-family: Kyobo Handwriting;
  font-size: 20px;
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
        <Title>어떤 질문을 찾고 있나요?</Title>
        <SearchInput onChange={onChange} value={searchWord} />
      </Container>
    );
}
  
export default Search;
  