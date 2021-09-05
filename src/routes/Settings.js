import React, { useState } from "react";
import { authService, dbService } from "../fBase";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    justify-content: center;
    align-items: center;
    font-family: Kyobo Handwriting;
`;

const ProfileContainer = styled.div`
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 150px;
    background-color: rgba(255,255,255,0.5);
    margin-bottom: 20px;
`;

const Title = styled.div`
    margin: 20px;
    display: flex;
    color: white;
    font-size: 25px;
    flex-direction: column;
`;

const ProfileLabel = styled.label`
    margin-bottom: 10px;
`;

const ProfileInput = styled.input`
    font-family: Kyobo Handwriting;
`;

const ProfileSubmitBtn = styled.button`
    font-size: 12px;
    border-radius: 10px;
    padding: 5px 10px;
    border: 1px solid rgba(0,0,0,0.5);
    color: black;
    background-color: rgba(255,255,255,0.5);
    :hover {
        cursor: pointer;
    }
`;

const LogOutBtn = styled.button`
    margin-top: 10px;
    font-size: 12px;
    border-radius: 15px;
    padding: 5px 10px;
    border: 1px solid rgba(0,0,0,0.5);
    color: white;
    background-color: transparent;
    font-family: Kyobo Handwriting;
    :hover {
        cursor: pointer;
    }
`;

const QnaContainer = styled.div`
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 200px;
    justify-content: center;
    align-items: center;
    background-color: rgba(255,255,255,0.5);
`;

const QnaLabel =styled.label`
    margin-bottom: 10px;
`;

const QnaInput = styled.textarea`
    font-size: 12px;
    width: 70%;
    height: 50px;
`;

const QnaSubmitBtn = styled.button`
    margin-top: 10px;
    font-size: 12px;
    border-radius: 10px;
    padding: 5px 10px;
    border: 1px solid rgba(0,0,0,0.5);
    color: black;
    background-color: rgba(255,255,255,0.5);
    font-family: Kyobo Handwriting;
    :hover {
        cursor: pointer;
    }
`;

const Settings = ({ refreshUser, userObj }) => {
    const [displayName, setDisplayName] = useState("");
    const [report, setReport] = useState('');

    const onChange = e => {
        setDisplayName(e.target.value)
    }

    const onChangeReport = e => {
        setReport(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (displayName && userObj.displayname !== displayName) {
            await userObj.updateProfile({
                displayName
            })
            dbService.collection("users").doc(`${userObj.uid}`).set({
                uid: userObj.uid,
                displayName: userObj.displayName
            }).then(
                alert("이름이 성공적으로 변경되었습니다 :)")
            )
            refreshUser();
            setDisplayName("");
        };
    };

    const onReport = async e => {
        e.preventDefault();
        if (report) { 
            const reportObj = {
            report,
            userId : userObj.uid,
            createdAt : Date.now()
        }
        dbService.collection("reports").add(reportObj)
        alert("성공적으로 제출되었습니다. 감사합니다 :)")
        setReport('');
    }
    }

    const onLogOut = (e) => {
        e.preventDefault();
        authService.signOut();
    }

    return (
        <Container>
            <Title>
                {userObj.displayName}의 서랍장
            </Title>

            <ProfileContainer>
                <ProfileLabel>이름 바꾸기</ProfileLabel>
                <ProfileInput onChange={onChange} value={displayName} type="text" />
                <ProfileLabel style={{marginTop: "5px", fontSize:"10px"}}>이름을 바꿔도, 친구들은 이전 이름을 알 수 있습니다.</ProfileLabel>
                <ProfileSubmitBtn onClick={onSubmit}>변경하기</ProfileSubmitBtn>
            </ProfileContainer>

            <QnaContainer>
                <QnaLabel>문의하기 & 버그리포트</QnaLabel>
                <QnaInput onChange={onChangeReport} value={report}type="text" />
                <QnaSubmitBtn onClick={onReport} >문의하기</QnaSubmitBtn>
            </QnaContainer>
            <LogOutBtn onClick={onLogOut}>Logout</LogOutBtn>
        </Container>
    );
  }
  
  export default Settings;
  