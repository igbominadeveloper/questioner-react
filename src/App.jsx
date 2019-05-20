import React from 'react';
import { Route, Switch } from 'react-router-dom';

//components
import Signup from './components/containers/Signup/Signup';
import Login from './components/containers/Login/Login';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Signup} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
    </Switch>
  );
};

export default App;
