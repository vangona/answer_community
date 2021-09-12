import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { dbService } from "../fBase";

const Container = styled.div`
    width: 90%;
    background-color: rgba(255,255,255,0.5);
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
`;

const Title = styled.h1`
    color: white;
`;

const Friend = styled.div`
    color: white;
    margin-top: 10px;
    :hover {
        cursor: pointer;
    }
    :active {
        transform: scale(0.98)
    }
`;

const Friends = ({userObj}) => {
    const [friends, setFriends] = useState([]);
    const [init, setInit] = useState(false);
    const history = useHistory();

    const getFriends = async () => {
        await dbService.collection("users").where("uid", "in", userObj.friends).get().then(
            snapshot => {
                const friendArray = snapshot.docs.map(doc => ({...doc.data()})
                )
                setFriends(friendArray)
            }
        )
        setInit(true);
    }

    const onClickUser = (e) => {
        history.push(`/useranswer/${e.target.id}`)
    }
      
    useEffect(() => {
        getFriends();
    }, [])
    return (
        <Container>
            {init ? 
            <>
            <Title>친구들</Title>
            <hr />
            {friends.map(friend => (
                <Friend id={friend.uid} onClick={onClickUser} key={friend.uid}>{friend.displayName}</Friend>
            ))}
            </>
            : "Loading..."
            }
        </Container>
    )
}

export default Friends;