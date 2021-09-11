import React, { useEffect, useState } from "react";
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
    width: 50px;
    height: 30px;
    color: white;
`;

const Friends = ({userObj}) => {
    const [friends, setFriends] = useState([]);
    const [init, setInit] = useState(false);

    const getFriends = async () => {
        let friendArray = [];

        await userObj.friends.forEach(friend => {
            dbService.collection("users").where("uid", "==", friend).get().then(
                snapshot => {
                    snapshot.docs.map(doc => friendArray.push({
                        ...doc.data()
                    }))
                }
            )
        })
        setFriends(friendArray);
        setInit(true);
        console.log(friends)
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
                <Friend>{friend.displayName}</Friend>
            ))}
            </>
            : "Loading..."
            }
        </Container>
    )
}

export default Friends;