import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { theme } from '../Theme/Theme';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from "@material-ui/core/CssBaseline";

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NavBar from './NavBar/NavBar';
import Login from '../Login/Login';
import Home from '../Home/Home';

export default function App() {
  console.log('%c Our Economic Lives!!', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        {/* Default direct to /home */}
        <Redirect exact from="/" to="/home" />
        {/* If authenticated, redirect /login to /home */}
        <ProtectedRoute
          exact
          path="/login"
          authRedirect="/home"
        >
          <Login />
        </ProtectedRoute>

        <ProtectedRoute
          exact
          path='/home'
        >
          <Home />
        </ProtectedRoute>

      </Router>
    </ThemeProvider>
  );
}
