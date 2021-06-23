import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { theme } from '../Theme/Theme';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from '../Home/Pyramid';
import Login from '../Login/Login';
import Register from '../Login/Register';
import Footer from '../Footer/Footer';
import NavBar from './NavBar/NavBar';

import './App.css';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Router>
        {/* <Redirect exact from="/" to="/home" /> */}
        {/* Login View */}
        <Route exact path="/login">
          <Login />
        </Route>
        {/* Register View */}
        <Route exact path='/register'>
          <Register />
        </Route>
        {/* Home Screen / Pyramid View */}
        <Route exact path="/home">
          <Home />
        </Route>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}
