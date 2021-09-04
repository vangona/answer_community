import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  background-color: transparent;
  border: 0;
  :hover {
    cursor: pointer;
  }
`;

const SearchBtn = styled.button`
  color: white;
  background-color: transparent;
  border: 0;
  position: fixed;
  bottom: 20px;
  right: 20px;
  :hover {
    cursor: pointer;
  }
`;

const Search = ({ searchWord, setSearchWord }) => {
    const [searchState, setSearchState] = useState(false);

    const onChange = (e) => {
      setSearchWord(e.target.value)      
    }

    const onClick = () => {
      setSearchState(!searchState)
    }

    return (
      <>
      {searchState ? 
        <Container>
        <Title>찾으시는 질문이 있나요?</Title>
        <SearchInput onChange={onChange} value={searchWord} />
        <CloseBtn onClick={onClick}><FontAwesomeIcon icon={faTimes} size="lg" /></CloseBtn>
      </Container>
      : <SearchBtn onClick={onClick}>
          <FontAwesomeIcon icon={faSearch} size="lg" />
        </SearchBtn>
      }
      </>
    );
}
  
export default Search;
  