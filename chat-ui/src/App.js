import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import CreateUser from './CreateUser';
import MainChat from './MainChat';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/chat" element={<MainChat />} />
          <Route path="/chat/:channelId" element={<MainChat />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
  );
};

export default App;