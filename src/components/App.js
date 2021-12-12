import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { authService, dbService } from "../fBase";
import Loading from "./Loading";
import { setToken } from "./Messaginginit";
import AppRouter from "./Router";
import { isMobile } from "react-device-detect";

const GlobalStyle = createGlobalStyle`
  ${reset};
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: Kyobo Handwriting;
`;

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [answerCount, setAnswerCount] = useState('');

  const questionArray = [
    {
        question : "결정을 잘 하시나요?",
        questionId : "b8f300df-0fff-4fd0-a066-3c5bafe6d024"
    }, 
    {
        question: "괜찮아요?",
        questionId: "ce35b720-8cbf-43af-aae6-914403c99789"
    },
    {
        question: "그리운가요?",
        questionId: "9428cfbc-2a42-48aa-8e2f-42700e928af4"
    },
    {
        question: "꼭 가보고 싶은 곳이 있나요?",
        questionId: "16a9a4c6-d1d9-4977-97ec-1fca76dc7b9c"
    },
    {
        question: "꿈이 있나요?",
        questionId: "00d1e249-bd6a-452c-81a4-458b30640945"
    },
    {
        question: "누군가에게 말하기 어려운 것이 있다면 여기에 적어보세요.",
        questionId: "f08c3f4a-13b7-4d6a-bf2b-901df73e5751"
    },
    {
        question: "느낌을 사기위해 무언가를 지불해본 적이 있나요?",
        questionId: "09770edd-b174-44de-a314-95a83eaa613e"
    },
    {
        question: "답답한가요?",
        questionId: "840ce86f-8a9e-444d-b1c1-8dd589c200ab"
    },
    {
        question: "당신께 사랑은 무엇인가요?",
        questionId: "4adc09d4-5a43-45b9-a525-d77454fa70a5"
    },
    {
        question: "당신께 행복은 무엇인가요?",
        questionId: "4f24a89a-3155-435b-84cb-82c731037942"
    },
    {
        question: "당신께도 질문이 있나요?",
        questionId: "88b121a4-e8ab-4d2d-99d3-7fec0876d439"
    },
    {
        question: "당신은 누구인가요?",
        questionId: "fa92f9e9-853a-4332-8bc6-79567fa23db5"
    },
    {
        question: "당신은 어떤 답장을 쓰고 싶으신가요?",
        questionId: "38beaf3b-90f3-4463-bfed-b5f416459280"
    },
    {
        question: "대화가 힘들때가 있나요?",
        questionId: "e459723f-00cb-43c5-8486-6d021433aea1"
    },
    {
        question: "두려운가요?",
        questionId: "e4741c08-ad4b-4328-952f-755db960fd38"
    },
    {
        question: "모순이 있나요?",
        questionId: "f8e4799a-aa4a-4b04-8e9d-667fb1a1d512"
    },
    {
        question: "무엇이라 불리고 싶나요?",
        questionId: "b6e8e867-1483-4249-89c1-9bb4a32517a8"
    },
    {
        question: "밤을 좋아하나요?",
        questionId: "d1e623a3-1d3e-45fb-9f3a-e737d9675766"
    },
    {
        question: "번외가 있나요?",
        questionId: "c7209c46-b4c0-40d5-ad1c-c420ccb0b9dc"
    },
    {
        question: "사랑이란 무엇일까요?",
        questionId: "2075b151-ed2d-4813-953e-a59a1f2d5bc6"
    },
    {
        question: "사랑하고 있나요?",
        questionId: "a06a2a77-1d1d-434c-a25d-38b6b4a5d2da"
    },
    {
        question: "사랑한다고 말해보세요.",
        questionId: "085e6ddd-7498-4a67-a894-1c42acc1c36a"
    },
    {
        question: "생각보다 중요하지 않았던 것이 있었나요?",
        questionId: "1f726ded-2c33-4803-9c5c-23cb63045667"
    },
    {
        question: "솔직한가요?",
        questionId: "109366f3-5429-4764-af23-e941e06b6e56"
    },
    {
        question: "어리광부리고 싶다면 여기에 부려보세요.",
        questionId: "d79dcd7f-e346-4b8d-9c96-50e8841efe54"
    },
    {
        question: "어릴 때 무얼하고 놀았는지 기억나나요?",
        questionId: "4303d851-1cb9-4e99-bfa5-a8735da2914a"
    },
    {
        question: "얼었던 것이 녹으면 무엇이 되나요?",
        questionId: "02a8706b-03c3-446c-9500-df3dc8fae4b1"
    },
    {
        question: "오늘 하늘은 무슨 색이었나요?",
        questionId: "55b33e10-36a5-4d24-af30-c8fa8bf13113"
    },
    {
        question: "용서할 수 있나요?",
        questionId: "640d40e5-8bee-49a8-ac49-f0879defa381"
    },
    {
        question: "이끌려본적이 있나요?",
        questionId: "ca706d16-6248-42f2-9826-77a9d8f7f94e"
    },
    {
        question: "이상형을 그려보세요.",
        questionId: "f11f02b9-88fb-4632-bdde-f824df368199"
    },
    {
        question: "이해받고 있나요?",
        questionId: "69b10746-2ee8-4941-b4d6-b943d6af7960"
    },
    {
        question: "잊었던 단어가 있나요?",
        questionId: "2d6d5007-4a8b-4176-8b1b-9556d66a2b05"
    },
    {
        question: "정말 소통하고 있나요?",
        questionId: "5dc5d43e-9642-4272-a2cc-5724ef9e95f2"
    },
    {
        question: "좋아하는 공간이 있나요?",
        questionId: "5690fbae-3972-4dfc-a21c-d6a3be147b9c"
    },
    {
        question: "즐거웠던 순간을 적어보세요.",
        questionId: "4e996e57-2dd3-47a2-b34d-d996678d3f25"
    },
    {
        question: "지금, 무슨 생각을 하시나요?",
        questionId: "e57084db-75c3-419c-b34b-fc42088e8d48"
    },
    {
        question: "지금, 무엇을 원하시나요?",
        questionId: "4ddb5a9b-415a-44f6-83a6-c86455b2ca7a"
    },
    {
        question: "지금, 어떤 감정을 느끼시나요?",
        questionId: "1fe19a57-445c-49ec-bc6b-d5e4aaed4410"
    },
    {
        question: "쫓기고 있나요?",
        questionId: "b1d88547-3c58-4a79-a4a1-a9cca797b06f"
    },
    {
        question: "큰 일이 닥친다면?",
        questionId: "c483234f-4d47-4786-b28d-29633b1f7644"
    },
    {
        question: "편지를 받은 기억이 있나요?",
        questionId: "88b4306d-91b8-43cc-ae82-67457d41d4e3"
    },
    {
        question: "표현하지 못하는 것이 있나요?",
        questionId: "a4be7cc2-a279-4715-bbbd-7e5a72f9d20c"
    },
    {
        question: "힘들었던 순간은 여기에 두고 가도록해요.",
        questionId: "e7ffd573-2901-45d5-9c79-42bebaa1ea4b"
    },
]

    const requestToken = async (user) => {
        let token = await setToken();
        if (token !== JSON.parse(localStorage.getItem("drawerToken"))) {
            dbService.collection("users").doc(`${user.uid}`).update({
                token
            })
            localStorage.setItem("drawerToken", JSON.stringify(token))
        }
    }

  useEffect(() => {
    if (isMobile) {
        const htmlCss = document.querySelector("html")
        htmlCss.style.fontSize = "16px";
    }
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        if ("serviceWorker" in navigator) {
            requestToken(user);
        }
        dbService.collection("main").doc("counts")
        .onSnapshot((snapshot) => {
            const countData = snapshot.data();
            setAnswerCount(countData.answers);
        });
        await dbService.collection("users").doc(`${user.uid}`).get()
        .then(snapshot => {
            const userData= snapshot.data()
            setUserObj({
                uid: user.uid,
                friends : userData.friends 
                    ? userData.friends 
                    : [],
                bookmarks : userData.bookmarks ? userData.bookmarks : [],
                isPassword : userData.isPassword,
                displayName: (user.displayName ? user.displayName : "익명"),
                updateProfile: (args) => user.updateProfile(args),
              })
            setInit(true)
        })
      } else {
        setUserObj(null)
        setInit(true)
      }
    })
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      isPassword: user.isPassword,
      friends: user.friends,
      bookmarks: user.bookmarks,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  const refreshFriends = (friends) => {
    const user = authService.currentUser;
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      isPassword: user.isPassword,
      friends,
      updateProfile: (args) => user.updateProfile(args),
    });
  }

  const refreshBookmarks = (bookmarks) => {
    const user = authService.currentUser;
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      isPassword: user.isPassword,
      bookmarks,
      updateProfile: (args) => user.updateProfile(args),
    });
  }

  return (
    <Container>
      <GlobalStyle />
      {init 
      ? 
      <>
        <AppRouter questionArray={questionArray} isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser} refreshFriends={refreshFriends} refreshBookmarks={refreshBookmarks} answerCount={answerCount} />
      </>
      : <Loading />
        }
    </Container>
  );
}

export default App;
