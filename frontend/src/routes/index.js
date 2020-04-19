import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Couriers from '../pages/Couriers';
import NewPackage from '../pages/NewPackage';
import NewCourier from '../pages/NewCourier';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Signin} />
      <Route path="/register" component={Signup} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/couriers" component={Couriers} isPrivate />
      <Route path="/newpackage" component={NewPackage} isPrivate />
      <Route path="/newcourier" component={NewCourier} isPrivate />
    </Switch>
  );
}
