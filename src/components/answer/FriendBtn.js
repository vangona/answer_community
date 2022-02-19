import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { dbService } from 'utils/fBase';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  color: inherit;
  transition: 0.5s all ease-in-out;
  z-index: 9;
  :hover {
    color: var(--gold);
    cursor: pointer;
  }
`;

const FriendBtn = ({ answer, userObj, refreshFriends }) => {
    const onClickFriend = async (answer) => {
        await dbService.collection('users')
          .doc(`${userObj.uid}`)
          .update({
            friends: [...userObj.friends, answer.userId]
          })
        .then(() => {
          refreshFriends(userObj, [...userObj.friends, answer.userId])
          alert(`${answer.userName}님을 서랍장에 추가했습니다.`)
        })
      }

    return (
      <>
        {userObj.friends && !userObj.friends.includes(answer.userId) && 
          <Container onClick={() => {onClickFriend(answer)}}>
              <FontAwesomeIcon icon={faUserFriends} />
          </Container>
        }
      </>
    );
};

export default FriendBtn;