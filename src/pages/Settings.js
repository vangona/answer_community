import React, { useState } from "react";
import { authService, dbService } from "utils/fBase";
import styled from "styled-components";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  padding: 40px 0;
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
  height: auto;
  padding: 20px 0px;
  box-sizing: border-box;
  transition: 1s all ease-in-out;
  background-color: rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;
`;

const Title = styled.div`
  margin: 20px;
  display: flex;
  color: white;
  font-size: 1.5rem;
  flex-direction: column;
`;

const ProfileLabel = styled.label`
  margin: 5px 0;
  :hover {
    cursor: pointer;
  }
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ProfileInput = styled.input`
  font-family: Kyobo Handwriting;
`;

const ProfileSubmitBtn = styled.input`
  font-size: 0.6rem;
  border-radius: 10px;
  padding: 5px 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  color: black;
  background-color: rgba(255, 255, 255, 0.5);
  font-family: Kyobo Handwriting;
  margin-top: 5px;
  :hover {
    cursor: pointer;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const ManualBtn = styled.button`
  margin-bottom: 10px;
  font-size: 0.7rem;
  border-radius: 15px;
  padding: 5px 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  background-color: transparent;
  font-family: Kyobo Handwriting;
  transition: 0.5s all ease-in-out;
  :hover {
    cursor: pointer;
    border: 1px solid var(--gold);
    color: var(--gold);
  }
`;

const CreditBtn = styled.button`
  position: relative;
  margin-bottom: 10px;
  font-size: 0.7rem;
  border-radius: 15px;
  padding: 5px 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  background-color: transparent;
  font-family: Kyobo Handwriting;
  transition: 0.5s all ease-in-out;
  :hover {
    cursor: pointer;
    border: 1px solid var(--gold);
    color: var(--gold);
  }
`;

const LogOutBtn = styled.button`
  margin-top: 10px;
  font-size: 0.7rem;
  border-radius: 15px;
  padding: 5px 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);
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
  background-color: rgba(255, 255, 255, 0.5);
`;

const QnaLabel = styled.label`
  margin-bottom: 10px;
`;

const QnaInput = styled.textarea`
  font-size: 0.8rem;
  width: 70%;
  height: 50px;
`;

const QnaSubmitBtn = styled.button`
  margin-top: 10px;
  font-size: 0.7rem;
  border-radius: 10px;
  padding: 5px 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  color: black;
  background-color: rgba(255, 255, 255, 0.5);
  font-family: Kyobo Handwriting;
  :hover {
    cursor: pointer;
  }
`;

const PurchaseBtn = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.7rem;
  border-radius: 15px;
  padding: 5px 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  background-color: transparent;
  font-family: Kyobo Handwriting;
  transition: 0.5s all ease-in-out;
  text-decoration: none;
  :hover {
    cursor: pointer;
    border: 1px solid var(--gold);
    color: var(--gold);
  }
`;

const Crown = styled.div`
  position: absolute;
  top: -10px;
  right: -3px;
  transform: rotate(20deg);
`;

const Error = styled.span`
  font-size: 0.8rem;
  margin: 10px;
`;

const Settings = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [report, setReport] = useState("");
  const [nameState, setNameState] = useState(false);
  const [emailState, setEmailState] = useState(false);
  const [passwordState, setPasswordState] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState("");

  const onClickCredit = (e) => {
    history.push("/credit");
  };

  const onClickManual = (e) => {
    history.push("/manual");
  };

  const onChange = (e) => {
    if (e.target.getAttribute("name") === "name") {
      setDisplayName(e.target.value);
    }
    if (e.target.getAttribute("name") === "email") {
      setEmail(e.target.value);
    }
    if (e.target.getAttribute("name") === "password") {
      setPassword(e.target.value);
    }
    if (e.target.getAttribute("name") === "passwordCheck") {
      setPasswordCheck(e.target.value);
    }
  };

  const onChangeReport = (e) => {
    setReport(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (displayName && userObj.displayname !== displayName) {
      await dbService
        .collection("users")
        .doc(`${userObj.uid}`)
        .update({
          displayName: displayName,
        })
        .then(() => {
          userObj.updateProfile({
            displayName,
          });
          refreshUser();
          setTimeout(() => {
            alert("이름이 성공적으로 변경되었습니다 :)");
          });
        });
      setDisplayName("");
    }
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    if (window.confirm(`${email}로 로그 인 코드를 변경할까요?`)) {
      await dbService.collection("users").doc(authService.currentUser.uid).update({
        email,
      });
      await authService.currentUser
        .verifyBeforeUpdateEmail(email)
        .then(() => {
          alert("해당 이메일로 가셔서 변경을 승인해주시면, 변경이 완료됩니다.");
          setEmailState(false);
          setEmail("");
        })
        .catch((e) => {
          setError(e.message);
        });
    }
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();
    if (password === passwordCheck) {
      if (window.confirm("비밀번호를 변경할까요?")) {
        await dbService.collection("users").doc(`${userObj.uid}`).update({
          isPassword: true,
        });
        authService.currentUser
          .updatePassword(password)
          .then(() => {
            alert("비밀번호 변경에 성공했습니다.");
            refreshUser();
            setPassword("");
            setPasswordCheck("");
            setError("");
          })
          .catch((e) => {
            setError(e.message);
          });
      }
    } else {
      setError("비밀번호가 다릅니다.");
    }
  };

  const onReport = async (e) => {
    e.preventDefault();
    if (report) {
      const reportObj = {
        report,
        userId: userObj.uid,
        createdAt: Date.now(),
      };
      dbService.collection("reports").add(reportObj);
      alert("성공적으로 제출되었습니다. 감사합니다 :)");
      setReport("");
    }
  };

  const onClick = (e) => {
    e.preventDefault();
    if (e.target.getAttribute("name") === "name") {
      setNameState(!nameState);
    }
    if (e.target.getAttribute("name") === "email") {
      setEmailState(!emailState);
    }
    if (e.target.getAttribute("name") === "password") {
      setPasswordState(!passwordState);
    }
  };

  const onLogOut = (e) => {
    e.preventDefault();
    authService.signOut();
  };

  return (
    <Container>
      <Title>{userObj.displayName}의 서랍장</Title>
      <ProfileContainer>
        {!(emailState | passwordState) && (
          <>
            <ProfileLabel name="name" onClick={onClick}>
              이름 바꾸기
            </ProfileLabel>
            <hr style={{ width: "70%", opacity: "70%" }} />
          </>
        )}
        {nameState && (
          <ProfileForm onSubmit={onSubmit}>
            <ProfileInput required name="name" onChange={onChange} value={displayName} type="text" />
            <ProfileLabel style={{ marginTop: "5px", fontSize: "10px", opacity: "80%" }}>
              이름을 바꿔도, 친구들은 이전 이름을 알 수 있습니다.
            </ProfileLabel>
            <ProfileSubmitBtn value="변경하기" type="submit" name="name" />
          </ProfileForm>
        )}
        {userObj.isPassword
          ? !(nameState | passwordState) && (
              <>
                <ProfileLabel name="email" onClick={onClick}>
                  접속 코드 변경
                </ProfileLabel>
                <hr style={{ width: "70%", opacity: "70%" }} />
              </>
            )
          : null}
        {emailState && (
          <ProfileForm onSubmit={onSubmitEmail}>
            <ProfileInput required name="email" onChange={onChange} value={email} type="email" />
            <ProfileLabel style={{ marginTop: "5px", fontSize: "10px" }}>접속코드는 이메일이어야 합니다.</ProfileLabel>
            <ProfileSubmitBtn value="변경하기" type="submit" name="email" />
            <Error>{error}</Error>
          </ProfileForm>
        )}
        {!(nameState | emailState) && (
          <>
            <ProfileLabel name="password" onClick={onClick}>
              {userObj.isPassword ? "비밀번호 바꾸기" : "비밀번호 설정하기"}
            </ProfileLabel>
            {passwordState && <hr style={{ width: "70%", opacity: "70%" }} />}
          </>
        )}
        {passwordState && (
          <PasswordForm onSubmit={onSubmitPassword}>
            <ProfileBox>
              <ProfileLabel name="password">비밀번호 : </ProfileLabel>
              <ProfileInput required name="password" onChange={onChange} value={password} type="password" />
            </ProfileBox>
            <ProfileBox>
              <ProfileLabel name="passwordCheck">비밀번호 확인 : </ProfileLabel>
              <ProfileInput required name="passwordCheck" onChange={onChange} value={passwordCheck} type="password" />
            </ProfileBox>
            <Error>{error}</Error>
            <ProfileSubmitBtn value="변경하기" type="submit" name="password" />
          </PasswordForm>
        )}
      </ProfileContainer>
      <BtnContainer>
        <ManualBtn onClick={onClickManual}>서랍장 사용 설명서</ManualBtn>
        <CreditBtn onClick={onClickCredit}>
          명예의 전당
          <Crown>
            <FontAwesomeIcon icon={faCrown} />
          </Crown>
        </CreditBtn>
        <PurchaseBtn target="_blank" href="https://smartstore.naver.com/myowndrawer/products/5772880639">
          책 선물 & 구매하러 가기
        </PurchaseBtn>
      </BtnContainer>
      <QnaContainer>
        <QnaLabel>문의하기 & 버그리포트</QnaLabel>
        <QnaInput onChange={onChangeReport} value={report} type="text" />
        <QnaSubmitBtn onClick={onReport}>문의하기</QnaSubmitBtn>
      </QnaContainer>
      <LogOutBtn onClick={onLogOut}>Logout</LogOutBtn>
    </Container>
  );
};

export default Settings;
