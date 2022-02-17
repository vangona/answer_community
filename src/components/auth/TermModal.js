import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    width: 80%;
    min-height: 80%;
    color: white;
    z-index: 1;
`;

const Background = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 80vh;
    background: black;
    opacity: 60%;
`;

const Terms = styled.div`
    text-align: center;
    word-break: keep-all;
    line-height: 140%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    height: 80vh;
    background: black;
    opacity: 100%;
`;

const CloseBtn = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.2rem;
    color: white;
    :hover {
        cursor: pointer;
    }
`;

const TermModal = ({ closeModal }) => {

    const onClickClose = () => {
        closeModal(false);
    }

    return (
        <Container>
            <CloseBtn onClick={onClickClose}>
                <FontAwesomeIcon icon={faCheck} />
            </CloseBtn>
            <Terms>
                이용약관 <br /><br />

                '누군가의 서랍장' 이하 '사이트' <br /><br />

                1. 이용자가 작성한 글에 대한 모든 책임은 작성한 이용자에게 있습니다. <br />
                2. 이용자는 타인이 불쾌할 수 있는 내용은 쪽지에도 글에도 쓰지 않습니다. <br />
                3. 이용자는 타인이 불쾌할 수 있는 내용을 작성시 언제든 글과 쪽지가 삭제될 수 있으며, 이용이 정지될 수 있습니다. <br />
                4. 이용자는 법의 이전, 최소한의 윤리의식을 가지고 사이트를 이용합니다. <br />
                5. 그러나 법의 심판이 필요할 때는 사이트는 적극적으로 협조합니다. <br />
            </Terms>
        </Container>
    )
}

export default TermModal;