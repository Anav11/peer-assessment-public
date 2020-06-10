import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { CreatePollPage } from './pages/CreatePollPage';
import { ChangePollPage } from './pages/ChangePollPage';
import { PollPage } from './pages/PollPage';
import { PollTable } from './pages/PollTable';
import { AuthPage } from './pages/AuthPage';
import { RegPage } from './pages/RegPage';

export const useRoutes = (isAuthenticated) => {
    if(isAuthenticated) {
        return (
            <Switch>
                <Route path="/main" exact>
                    <MainPage />
                </Route>
                <Route path="/createPoll" exact>
                    <CreatePollPage />
                </Route>
                <Route path="/poll/:id">
                    <PollPage />
                </Route>
                <Route path="/pollTable/:id">
                    <PollTable />
                </Route>
                <Route path="/changePoll/:id">
                    <ChangePollPage />
                </Route>
                <Redirect to="main" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Route>
                <RegPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}