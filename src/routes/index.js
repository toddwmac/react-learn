import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Welcome from '../pages/Welcome';
import CounterPage from '../pages/CounterPage';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Welcome} />
      <Route path="/counter" component={CounterPage} />
    </Switch>
  );
}
