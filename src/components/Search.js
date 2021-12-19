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
  z-index: 10;
  transition: 0.3s all ease-in-out;
  background-color: rgba(0,0,0,0.5);
  :hover, :focus-within {
    background-color: rgba(0,0,0,0.8);
  }
`;

const Title = styled.h1`  
  font-family: Kyobo Handwriting;
  font-size: 14px;
  color: var(--gold);
  margin-bottom: 20px;
  transition: 0.3s all ease-in-out;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;

const SearchInput = styled.input`
  width: 200px;
  transition: 0.3s all ease-in-out;
  :focus {
    border-radius: 10px;
  }
`;

const SearchSubmit = styled.button`
    font-size: 0.8rem;
    border-radius: 5px;
    padding: 3px 5px;
    border: 1px solid rgba(255,255,255,0.5);
    color: white;
    background-color: transparent;
    font-family: Kyobo Handwriting;
    transition: 0.5s all ease-in-out;
    :hover {
        cursor: pointer;
        border: 1px solid var(--gold);
        color: var(--gold);
    }
    :active {
      transform: scale(0.95)
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: white;
  background-color: transparent;
  border: 0;
  position: fixed;
  bottom: 30px;
  right: 30px;
  font-size: 1rem;
  font-family: Kyobo Handwriting;
  transition: 0.5s all ease-in-out;
  :hover {
    cursor: pointer;
    color: var(--gold);
  }
`;

const SearchBtnLabel = styled.span`
  font-size: 12px;
`;

const Search = ({ onSearch, from, searchWord, setSearchWord }) => {
    const [searchState, setSearchState] = useState(false);
    const fromHome = from === "home" ? true : false

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
        <Title>찾으시는 {fromHome ? "답변" : "질문"}이 있나요?</Title>
        <SearchContainer>
          <SearchInput onChange={onChange} value={searchWord} />
          {from === "home" && <SearchSubmit onClick={onSearch}>검색하기</SearchSubmit>}
        </SearchContainer>
        <CloseBtn onClick={onClick}><FontAwesomeIcon icon={faTimes} size="lg" /></CloseBtn>
      </Container>
      : <SearchBtn onClick={onClick}>
          <FontAwesomeIcon icon={faSearch} />
          <SearchBtnLabel>
          {fromHome ? "답변" : "질문"} 찾기
          </SearchBtnLabel>
        </SearchBtn>
      }
      </>
    );
}
  
export default Search;
  