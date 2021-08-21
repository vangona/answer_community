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

const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn ? 
            ( <> 
                <Navigation />
                <Switch>
                    <Route exact path="/" >
                        <Home />
                    </Route>
                    <Route exact path="/auth" >
                        <Auth />
                    </Route>
                    <Route exact path="/myanswers" >
                        <MyAnswers />
                    </Route>
                    <Route exact path="/questions" >
                        <Questions />
                    </Route>
                    <Route exact path="/question/:id" >
                        <QuestionDetail />
                    </Route>
                    <Route exact path="/answer/:id" >
                        <AnswerDetail />
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