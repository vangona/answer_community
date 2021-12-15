import React, { useState } from "react";
import styled from "styled-components";
import { dbService } from "../fBase";

const Container = styled.div`
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 15px;
    justify-content: center;
    align-items: center;
    background-color: rgba(255,255,255,0.5);
    margin: 15px 0;
    box-sizing: border-box;
`;

const EditBtn = styled.button``;

const BioTextarea = styled.textarea``;

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
            {editState 
            ? <BioTextarea onChange={onChange} value={bio} />
            : `${userObj.bio}`
            }
            <EditBtn onClick={onClickEdit}>edit</EditBtn>
        </Container>
    )
}

export default ProfileBio;