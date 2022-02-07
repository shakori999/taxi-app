import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'; // changed

import DriverDashboard from './DriverDashboard'; // new
import DriverDetail from './DriverDetail'; // new
import { isDriver } from '../services/AuthService';

function Driver (props) {
  if (!isDriver()) {
    return <Redirect to='/' />
  }

  // changed
  return (
    <Switch>
      <Route path='/driver/:id' component={DriverDetail} />
      <Route component={DriverDashboard} />
    </Switch>
  );
}

export default Driver;