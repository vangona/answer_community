import { faPencilAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import styled from "styled-components";
import { dbService } from "../fBase";
import Loading from "./Loading";

const Container = styled.div`
    position: relative;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: 80%;
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
    font-size: 0.9rem;
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
    margin-top: 5px;
    color: white;
`;

const BioTextarea = styled.textarea`
    width: 100%;
    min-height: 100px;
`;

const TextCounter = styled.span`
    margin-top: 10px;
`;

const ProfileBio = ({ userObj, refreshBio, isProfile }) => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [editState, setEditState] = useState(false);
    const [bio, setBio] = useState('');
    const [count, setCount] = useState(0);

    const onClickEdit = () => {
        setEditState(!editState)
        setBio(userObj.bio);
        if (editState && bio !== userObj.bio) {
            window.confirm('소개를 바꾸시겠어요?') &&
            dbService.collection("profiles").doc(`${userObj.uid}`)
            .update({
                bio,
            })
            .then(() => {
                refreshBio(bio)
                setCount(bio.length)
            })            
        }
    }

    const onChange = (e) => {
        setBio(e.target.value);
        setCount(e.target.value.length);
    }

    const getBio = async () => {
        await dbService.collection("profiles").doc(`${id}`).get().then(snapshot => {
            const data = snapshot.data();
            setBio(data.bio);
            setIsLoading(false);
        })
    };

    useEffect(() => {
        if (!isProfile) {
            getBio();
        } else {
            setIsLoading(false);
        }
    }, [])

    return (
        <Container>
            {isLoading
            ? ''
            : 
            <>
                <BioContainer>
                    <BioTitle>
                        소개
                    </BioTitle>
                    <BioLine />
                {editState 
                ? 
                <>
                <BioTextarea maxLength={200} onChange={onChange} value={bio} />
                <TextCounter>{count} / 200</TextCounter>
                </>
                : 
                    <BioContent>
                        {isProfile 
                        ? userObj.bio
                        : bio
                        ? bio
                        : "소개말이 없습니다."
                        }                    
                    </BioContent>
                }
                {isProfile &&
                <EditBtn onClick={onClickEdit}>
                    {editState 
                    ? <FontAwesomeIcon icon={faSave} />
                    : <FontAwesomeIcon icon={faPencilAlt} />
                    }
                </EditBtn>
                }
                </BioContainer>
            </>
            }
        </Container>
    )
}

export default ProfileBio;