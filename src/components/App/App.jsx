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
import Home from '../Home/Home';
import Footer from '../Footer/Footer';

import './App.css';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Redirect exact from="/" to="/home" />
          <Route exact path="/home">
            <Home />
          </Route>
          <Footer />
        </Router>
      </ThemeProvider>
  );
}
