import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
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

import './App.css';
import BlockSlider from '../Home/BlockSlider';
import BlockDetail from '../Home/BlockDetail';

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
        <ProtectedRoute
          exact 
          path='/home'
        >
          <Home />
        </ProtectedRoute>
        <Route exact path="/blockSlider">
          <BlockSlider />
        </Route>
        <Route exact path="/blockDetail">
          <BlockDetail />
        </Route>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}
