import { faBookOpen, faBookReader } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { dbService, firebaseInstance } from 'utils/fBase';

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

const BookmarkBtn = ({answer, userObj, refreshBookmarks}) => {
    const onClickBookmark = async (e) => {
        e.preventDefault();
        if (!userObj.bookmarks) {
          await dbService.collection('users')
            .doc(`${userObj.uid}`)
            .update({
              bookmarks: [answer.answerId]
            })
          .then(async () => {
            await dbService.collection('answers')
              .doc(`${answer.answerId}`)
              .update({
                bookmarkCount: firebaseInstance.firestore.FieldValue.increment(1)
              });
    
            refreshBookmarks([answer.answerId]);
          }) 
        } else {
          await dbService.collection('users')
            .doc(`${userObj.uid}`)
            .update({
              bookmarks: [...userObj.bookmarks, answer.answerId]
            })
          .then(async () => {
            await dbService.collection('answers')
              .doc(`${answer.answerId}`)
              .update({
                bookmarkCount: firebaseInstance.firestore.FieldValue.increment(1)
              })
    
            refreshBookmarks([...userObj.bookmarks, answer.answerId]);
          })  
        }
    
      }
    
      const onDeleteBookmark = async (e) => {
        e.preventDefault();
        window.confirm('책갈피를 빼시겠어요?') &&
        await dbService.collection('users')
          .doc(`${userObj.uid}`
          ).update({
            bookmarks: [...userObj.bookmarks.filter((el) => el !== answer.answerId)],
          })
        .then(async () => {
          await dbService.collection('answers')
            .doc(`${answer.answerId}`)
            .update({
              bookmarkCount: firebaseInstance.firestore.FieldValue.increment(-1)
            })
    
          refreshBookmarks([...userObj.bookmarks.filter((el) => el !== answer.answerId)]);
        })       
      }

    return (
        <>
            {userObj.bookmarks && userObj.bookmarks.includes(answer.answerId)
            ? 
              <Container onClick={onDeleteBookmark}>
                <FontAwesomeIcon icon={faBookReader} />
              </Container>
            :
              <Container onClick={onClickBookmark}>
                <FontAwesomeIcon icon={faBookOpen} />
              </Container>
            }
        </>
    );
};

export default BookmarkBtn;