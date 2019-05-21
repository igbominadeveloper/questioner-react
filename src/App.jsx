import React from 'react';
import { Route, Switch } from 'react-router-dom';

//components
import Signup from './components/containers/Signup/Signup';
import Login from './components/containers/Login/Login';
import Homepage from './pages/Landing';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
    </Switch>
  );
};

export default App;
