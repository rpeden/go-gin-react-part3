import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import CreateUser from './CreateUser';
import MainChat from './MainChat';

const App = () => {
  return (
      <Router>
        <Switch>
          <Route path="/create-user" component={CreateUser} />
          <Route path="/chat" component={MainChat} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
  );
};

export default App;