import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import MyAnswers from "../routes/MyAnswers";
import AnswerDetail from "../routes/AnswerDetail";
import QuestionDetail from "../routes/QuestionDetail";
import QuestionRegister from "../routes/QuestionRegister";
import Questions from "../routes/Questions";
import Navigation from "../routes/Navigation";
import CheerRegister from "../routes/CheerRegister";
import Settings from "../routes/Settings";
import Community from "../routes/Community";
import UserAnswers from "../routes/UserAnswers";

const AppRouter = ({ questionArray, isLoggedIn, userObj, refreshUser }) => {
    return (
        <Router>
            {isLoggedIn ? 
            ( <> 
                <Navigation />
                <Switch>
                    <Route exact path="/" >
                        <Home userObj={userObj} />
                    </Route>
                    <Route exact path="/auth" >
                        <Auth />
                    </Route>
                    <Route exact path="/community" >
                        <Community userObj={userObj} />
                    </Route>
                    <Route exact path="/myanswers" >
                        <MyAnswers questionArray={questionArray} userObj={userObj} />
                    </Route>
                    <Route exact path="/questions" >
                        <Questions questionArray={questionArray} userObj={userObj} />
                    </Route>
                    <Route exact path="/question/:id" >
                        <QuestionDetail userObj={userObj} />
                    </Route>
                    <Route exact path="/user/:id" >
                        <UserAnswers userObj={userObj} />
                    </Route>
                    <Route exact path="/settings" >
                        <Settings refreshUser={refreshUser} userObj={userObj} />
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