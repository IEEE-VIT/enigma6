import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LogInPage from './pages/LogInPage/LogInPage';
import HomePage from './pages/HomePage/HomePage.js';
import MainPage from './pages/MainPage/MainPage';
import Error404Page from './pages/Error404Page/Error404Page';
import TimerPage from './pages/TimerPage/TimerPage';
import Particles from 'react-particles-js';
import particleOptions from './particlesjs-config';


const AppRouter=()=> {
    return (
      <div id="app">
        <Particles className="particles" params={particleOptions}/>
        <BrowserRouter>
        <Switch>
          <Route path="/signup" component={SignUpPage} exact={true}/>
          <Route path="/login" component={LogInPage} exact={true}/>
          <Route path='/' component={HomePage} exact={true}  />
          <Route path='/play' component={MainPage} exact={true}  />
          <Route path='/welcome' component={TimerPage}/>
          <Route component={Error404Page} />

        </Switch>
      </BrowserRouter>
      </div>
  );
}

export default AppRouter;
