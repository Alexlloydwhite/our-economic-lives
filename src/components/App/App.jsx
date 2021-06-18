import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Home from '../Home/Home';

import './App.css';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <h1>Yo</h1>
      <Redirect exact from="/" to="/home" />
      <Route exact path="/home">
        <Home />
      </Route>
    </Router>
  );
}
