

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GamePlayPage from './components/gamePlayPage';
import GameDetailsPage from './components/gameDetailPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={GamePlayPage} />
        <Route path="/game-details" component={GameDetailsPage} />
      </Switch>
    </Router>
  );
};

export default App;
