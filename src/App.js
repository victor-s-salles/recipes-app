import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <>
      <Route exact path="/" component={ Login } />
      <Route path="/profile" component={ Profile } />
    </>
  );
}

export default App;
