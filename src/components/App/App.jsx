import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { theme } from '../Theme/Theme';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Login/Register';
import Footer from '../Footer/Footer';
import NavBar from './NavBar/NavBar';
import CoachCritExpReview from '../CoachCritExpReview/CoachCritExpReview';
// import './App.css';
import BlockSlider from '../Home/BlockSlider';
import BlockDetail from '../Home/BlockDetail';
import ClientProfile from '../ClientProfile/ClientProfile';

export default function App() {
  console.log('%c Our Economic Lives!!', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Router>
        {/* Default direct to /home */}
        <Redirect exact from="/" to="/home" />
        {/* If authenticated, show /home as /login */}
        <ProtectedRoute
          exact
          path="/login"
          authRedirect="/home"
        >
          <Login />
        </ProtectedRoute>
        {/* If authenticated, show /register as / */}
        <ProtectedRoute
          exact
          path="/register"
          authRedirect="/home"
        >
          <Register />
        </ProtectedRoute>
        {/* 
          /home:
          Client: Pyramid View
          Coach: Dashboard
          PA: Dashboard
        */}
        <ProtectedRoute
          exact
          path='/home'
        >
          <Home />
        </ProtectedRoute>
        <Route
          exact
          path='/crit-review/:id'
        >
          <CoachCritExpReview />
        </Route>


        <Route exact path="/blockSlider">
          <BlockSlider />
        </Route>
        {/* Building Block Detail - Client */}
        <Route exact path="/blockDetail/:id">
          <BlockDetail />
        </Route>
        <Route exact path="/profile">
          <ClientProfile />
        </Route>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}
