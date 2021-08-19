import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 50px;
  height: 50px;
  width: 100%;
  transition: 0.3s all ease-in-out;
  :hover {
    background-color: rgba(0,0,0,0.5);
  }
`;

const SearchInput = styled.input``;

const Search = ({ searchWord, setSearchWord }) => {
    const onChange = (e) => {
      setSearchWord(e.target.value)      
    }
    return (
      <Container>
        <SearchInput onChange={onChange} value={searchWord} />
      </Container>
    );
}
  
export default Search;
  