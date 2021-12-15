import { faPencilAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { dbService } from "../fBase";

const Container = styled.div`
    position: relative;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    justify-content: center;
    align-items: center;
    background-color: rgba(255,255,255,0.5);
    margin: 15px 0;
    box-sizing: border-box;
`;

const EditBtn = styled.button`
    align-self: flex-end;
    border: none;
    background: none;
    color: white;
    transition: all 0.5s ease-in-out;
    margin-top: 10px;
    font-size: 1rem;
    :hover {
        cursor: pointer;
        color: var(--gold);
    }
`;

const BioContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    justify-content: center;
    align-items: flex-start;
`;

const BioTitle = styled.h1`
    color: white;
    font-size: 1.2rem;
`;

const BioLine = styled.hr`
    width: 100%;
`;

const BioContent = styled.div`
    color: white;
`;

const BioTextarea = styled.textarea`
    width: 100%;
    min-height: 100px;
`;

const ProfileBio = ({ userObj, refreshBio }) => {
    const [editState, setEditState] = useState(false);
    const [bio, setBio] = useState('');

    const onClickEdit = () => {
        setEditState(!editState)
        setBio(userObj.bio);
        if (editState && bio !== userObj.bio) {
            window.confirm('소개를 바꾸시겠어요?') &&
            dbService.collection("users").doc(`${userObj.uid}`)
            .update({
                bio,
            })
            .then(refreshBio(bio))            
        }
    }

    const onChange = (e) => {
        setBio(e.target.value)
    }

    return (
        <Container>
            <BioContainer>
                <BioTitle>
                    소개
                </BioTitle>
                <BioLine />
            {editState 
            ? <BioTextarea onChange={onChange} value={bio} />
            : 
                <BioContent>
                    {userObj.bio}
                </BioContent>
            }
            <EditBtn onClick={onClickEdit}>
                {editState 
                ? <FontAwesomeIcon icon={faSave} />
                : <FontAwesomeIcon icon={faPencilAlt} />
                }
            </EditBtn>
            </BioContainer>
        </Container>
    )
}

export default ProfileBio;