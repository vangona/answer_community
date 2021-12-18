import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import MyAnswers from "../routes/MyAnswers";
import QuestionDetail from "../routes/QuestionDetail";
import QuestionRegister from "../routes/QuestionRegister";
import Questions from "../routes/Questions";
import Navigation from "../routes/Navigation";
import Settings from "../routes/Settings";
import Community from "../routes/Community";
import UserAnswers from "../routes/UserAnswers";
import SignOut from "../routes/SignOut";
import Credit from "../routes/Credit";
import NotesUser from "../routes/NotesUser";
import NotesAnswer from "../routes/NotesAnswer";
import Manual from "../routes/Manual";
import AnswerDetail from "../routes/AnswerDetail";
import NotFound from "./NotFound";

const AppRouter = ({ questionArray, isLoggedIn, userObj, refreshUser, refreshFriends, answerCount, refreshBookmarks, refreshBio }) => {
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
                        <Manual />
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