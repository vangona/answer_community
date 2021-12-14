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
    margin-bottom: 10px;
`;

const Title = styled.h1`
    color: white;
`;

const FriendList = styled.div`
    width: 100%;
    padding: 3px 0;
    max-height: 25vh;
    overflow: auto;
    ::-webkit-scrollbar {
        width: 7px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgba(255,255,255,0.7);
        border-radius: 5px;
    }
`;

const Friend = styled.div`
    display: flex;
    justify-content: space-between;
    color: white;
    margin-top: 10px;
`;

const FriendRight = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
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

const FriendIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    :hover {
        cursor: pointer;
    }
    :active {
        transform: scale(0.98);
    }
`;

const Notice = styled.div`
    color: rgba(0,0,0,0.5);
    margin-top: 15px;
    font-size: 0.9rem;
    text-align: center;
    line-height: 130%;
`;

const Friends = ({userObj, refreshFriends, getFriendLoading, loading}) => {
    const [friends, setFriends] = useState([]);
    const [friendsId, SetFriendsId] = useState([]);
    const history = useHistory();

    const getFriends = async () => {
        if(userObj.friends && userObj.friends.length !== 0) {
            await dbService.collection("users").where("uid", "in", userObj.friends).onSnapshot(
            snapshot => {
                const friendArray = snapshot.docs.map(doc => ({...doc.data()})
                )
                let friendIdArray = [];
                snapshot.docs.forEach(doc => {
                    friendIdArray.push(doc.data().uid)
                })
                setFriends(friendArray)
                SetFriendsId(friendIdArray)
            })
        getFriendLoading(true)
        } else {
            setFriends([]);
            getFriendLoading(true)
        }
    }

    const onClickUser = (e) => {
        history.push(`/useranswer/${e.target.id}`)
    }
      
    const onDeleteFriend = async (friend) => {
        const newFriends = friendsId.filter(data => data !== friend.uid)
        await dbService.collection("users").doc(`${userObj.uid}`).update(
            {friends : newFriends}
        )
        .then(() => {
            console.log(newFriends)
            refreshFriends(newFriends);
            alert(`${friend.displayName}님을 서랍장에서 꺼냈습니다.`)
        })
    }

    useEffect(() => {
        getFriends();
    }, [])
    return (
        <>
        {loading ?

            <Container>
            <Title>내가 아끼는 누군가들</Title>
            <hr />
            <FriendList>
                {friends.length !== 0 
                ? friends.map(friend => (
                    <Friend key={friend.uid}>
                        <FriendName id={friend.uid} onClick={onClickUser}>
                            {friend.displayName}
                        </FriendName>
                        <FriendRight>                        
                            <FriendCode>
                            #{friend.uid.slice(-4).toLowerCase()}
                            </FriendCode>
                            <FriendIcon>
                                <FontAwesomeIcon onClick={() => {
                                    if (window.confirm(`${friend.displayName}님을 목록에서 삭제하시겠어요?`)) {
                                        onDeleteFriend(friend)
                                    }}
                                    } icon={faTrashAlt} size="sm" />
                            </FriendIcon>
                        </FriendRight>
                    </Friend>
                ))
                : <Notice>다른 사람의 답변을 통해 <br /> 다른 누군가의 서랍장을 추가 할 수 있어요.</Notice>
                }
            </FriendList>
        </Container>
            : null
        }
        </>
    )
}

export default Friends;