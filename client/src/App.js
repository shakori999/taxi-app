import React from 'react';
import {Link, Route, Switch } from 'react-router-dom'; // new

import SignUp from './component/SignUp';
import LogIn from './component/LogIn';

import './App.css';

// changed
function App () {
  return (
    <Switch>
    <Route exact path='/' render={() => (
      <div>
        <h1>Taxi</h1>
        <Link to='/sign-up'>Sign Up</Link>
        <Link to='/log-in'>Log In</Link>
      </div>
    )} />
    <Route path='/sign-up' component={SignUp} />
    <Route path='/log-in' component={LogIn} />
    </Switch>
  );
}

export default App;
