import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    display: flex;
    justify-content: space-between;
    color: white;
    margin-top: 10px;
`;

const FriendIcon = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

const FriendName = styled.div`
    :hover {
        cursor: pointer;
    }
    :active {
        transform: scale(0.98)
    }
`;

const FriendCode = styled.div``;

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
                <Friend key={friend.uid}>
                    <FriendName id={friend.uid} onClick={onClickUser}>
                        {friend.displayName}
                    </FriendName>
                    <FriendIcon>                         <FriendCode>
                        #{friend.uid.slice(-4).toLowerCase()}
                        </FriendCode>
                        <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                    </FriendIcon>

                </Friend>
            ))}
            </>
            : "Loading..."
            }
        </Container>
    )
}

export default Friends;