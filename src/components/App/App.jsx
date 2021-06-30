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
import CoachProtectedRoute from '../ProtectedRoute/CoachProtectedRoute';

import NavBar from './NavBar/NavBar';
import Login from '../Login/Login';
import Home from '../Home/Home';
import ClientProfile from '../ClientProfile/ClientProfile';
import BlockDetail from '../ClientPyramid/BlockDetail';
import CoachCritReview from '../CoachCritExpReview/CoachCritExpReview';

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

        {/* Default direct to /home */}
        <Redirect exact from="/" to="/home" />

        {/* 
          /Home redirects based on auth level
          Clients see the pyramid
          Coaches see dashboard
          Admins see dashboard
        */}
        <ProtectedRoute
          exact
          path='/home'
        >
          <NavBar />
          <Home />
        </ProtectedRoute>

        {/* 
          If authenticated, redirect /login to /home 
          If user is not registered, shows register from
        */}
        <ProtectedRoute
          exact
          path="/login"
          authRedirect="/home"
        >
          <Login />
        </ProtectedRoute>

        {/* Client Profile View */}
        <ProtectedRoute
          exact
          path="/profile"
        >
          <NavBar />
          <ClientProfile />
        </ProtectedRoute>

        {/* Client Critical Experience View */}
        <ProtectedRoute
          exact
          path="/blockdetail/:id"
        >
          <NavBar />
          <BlockDetail />
        </ProtectedRoute>

        <CoachProtectedRoute
          exact
          path="/crit-review/:id"
        >
          <NavBar />
          <CoachCritReview />
        </CoachProtectedRoute>


      </Router>
    </ThemeProvider>
  );
}
