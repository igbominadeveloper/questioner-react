import React from 'react';
import { Route, Switch } from 'react-router-dom';

//components
import Signup from './components/containers/Signup/Signup';
import Login from './components/containers/Login/Login';
import Homepage from './pages/Landing';
import NewMeetup from './components/containers/NewMeetup/NewMeetup';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/organize" component={NewMeetup} />
    </Switch>
  );
};

export default App;
