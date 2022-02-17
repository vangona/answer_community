import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "pages/Home";
import Auth from "pages/Auth";
import MyAnswers from "pages/MyAnswers";
import QuestionDetail from "pages/QuestionDetail";
import QuestionRegister from "pages/QuestionRegister";
import Questions from "pages/Questions";
import Navigation from "pages/Navigation";
import Settings from "pages/Settings";
import Community from "pages/Community";
import UserAnswers from "pages/UserAnswers";
import SignOut from "pages/SignOut";
import Credit from "pages/Credit";
import NotesUser from "pages/NotesUser";
import NotesAnswer from "pages/NotesAnswer";
import Manual from "pages/Manual";
import AnswerDetail from "pages/AnswerDetail";
import NotFound from "components/error/NotFound";

const AppRouter = ({ questionArray, isLoggedIn, userObj, refreshUser, refreshFriends, answerCount, refreshBookmarks, refreshBio, refreshFirst }) => {
    return (
        <Router>
            {isLoggedIn ? 
            ( <> 
                <Navigation />
                <Switch>
                    <Route exact path="/" >
                        <Home userObj={userObj} refreshFriends={refreshFriends} refreshBookmarks={refreshBookmarks} answerCount={answerCount} />
                    </Route>
                    <Route exact path="/auth" >
                        <Auth />
                    </Route>
                    <Route exact path="/community" >
                        <Community userObj={userObj} refreshFriends={refreshFriends} refreshBookmarks={refreshBookmarks} />
                    </Route>
                    <Route exact path="/notes/user/:id" >
                        <NotesUser userObj={userObj} />
                    </Route>
                    <Route exact path="/notes/user/:id/:answerId" >
                        <NotesAnswer userObj={userObj} />
                    </Route>
                    <Route exact path="/answer/:id" >
                        <AnswerDetail userObj={userObj} refreshFriends={refreshFriends} refreshBookmarks={refreshBookmarks} />
                    </Route>
                    <Route exact path="/myanswers" >
                        <MyAnswers questionArray={questionArray} userObj={userObj} refreshBio={refreshBio} />
                    </Route>
                    <Route exact path="/questions" >
                        <Questions questionArray={questionArray} userObj={userObj} />
                    </Route>
                    <Route exact path="/question/:id" >
                        <QuestionDetail userObj={userObj} refreshFriends={refreshFriends} refreshBookmarks={refreshBookmarks} />
                    </Route>
                    <Route exact path="/useranswer/:id" >
                        <UserAnswers userObj={userObj} refreshFriends={refreshFriends} refreshBookmarks={refreshBookmarks} />
                    </Route>
                    <Route exact path="/settings" >
                        <Settings refreshUser={refreshUser} userObj={userObj} refreshBio={refreshBio} />
                    </Route>
                    <Route exact path="/manual">
                        <Manual userObj={userObj} refreshFirst={refreshFirst} />
                    </Route>                    
                    <Route exact path="/credit">
                        <Credit />
                    </Route>
                    <Route exact path="/signout" >
                        <SignOut />
                    </Route>
                    <Route exact path="/questionregister" >
                        {userObj.uid === "oaQ2Ruq5mVZbFDb9t5E2fukKhox2"
                            ? <QuestionRegister userObj={userObj} />
                            : <NotFound />
                        }                            
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </>
            ) : (
            <>
                <Route exact path="/">
                    <Auth />
                </Route>
                <Redirect from="*" to="/" />
            </>
            )
            }
        </Router>
    )
}

export default AppRouter;