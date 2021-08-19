import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "../routes/Home";
import Login from "../routes/Login";
import MyAnswers from "../routes/MyAnswers";
import AnswerDetail from "../routes/AnswerDetail";
import QuestionDetail from "../routes/QuestionDetail";
import QuestionRegister from "../routes/QuestionRegister";
import Questions from "../routes/Questions";
import Navigation from "../routes/Navigation";

const AppRouter = () => {
    return (
        <Router>
            <Navigation />
            <Switch>
                <Route exact path="/" >
                    <Home />
                </Route>
                <Route exact path="/login" >
                    <Login />
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
            </Switch>
        </Router>
    )
}

export default AppRouter;