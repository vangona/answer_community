import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import MyAnswers from "../routes/MyAnswers";
import QuestionDetail from "../routes/QuestionDetail";
import QuestionRegister from "../routes/QuestionRegister";
import Questions from "../routes/Questions";
import Navigation from "../routes/Navigation";
import CheerRegister from "../routes/CheerRegister";
import Settings from "../routes/Settings";
import Community from "../routes/Community";
import UserAnswers from "../routes/UserAnswers";
import SignOut from "../routes/SignOut";
import Credit from "../routes/Credit";

const AppRouter = ({ questionArray, isLoggedIn, userObj, refreshUser, refreshFriends, answerCount, noteData, tokenData }) => {
    return (
        <Router>
            {isLoggedIn ? 
            ( <> 
                <Navigation />
                <Switch>
                    <Route exact path="/" >
                        <Home tokenData={tokenData} userObj={userObj} answerCount={answerCount} refreshFriends={refreshFriends} />
                    </Route>
                    <Route exact path="/auth" >
                        <Auth />
                    </Route>
                    <Route exact path="/community" >
                        <Community tokenData={tokenData} userObj={userObj} refreshFriends={refreshFriends} noteData={noteData} />
                    </Route>
                    <Route exact path="/myanswers" >
                        <MyAnswers questionArray={questionArray} userObj={userObj} />
                    </Route>
                    <Route exact path="/questions" >
                        <Questions questionArray={questionArray} userObj={userObj} />
                    </Route>
                    <Route exact path="/question/:id" >
                        <QuestionDetail tokenData={tokenData} userObj={userObj} refreshFriends={refreshFriends} />
                    </Route>
                    <Route exact path="/useranswer/:id" >
                        <UserAnswers tokenData={tokenData} userObj={userObj} refreshFriends={refreshFriends} />
                    </Route>
                    <Route exact path="/settings" >
                        <Settings refreshUser={refreshUser} userObj={userObj} />
                    </Route>
                    <Route exact path="/credit">
                        <Credit />
                    </Route>
                    <Route exact path="/signout" >
                        <SignOut />
                    </Route>
                </Switch>
                <Switch>
                    <Route exact path="/questionregister" >
                        <QuestionRegister />
                    </Route>
                    <Route exact path="/cheerregister" >
                        <CheerRegister />
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