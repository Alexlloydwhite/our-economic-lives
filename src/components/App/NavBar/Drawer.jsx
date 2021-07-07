/***********************************************************
************************************************************
**                                                        ** 
**  This is the code for the menu in the hamburger        **
**  button. I will do my best to explain all the code     **
**  in my comments. However, it may be easiest to start   **
**  reading the code from the bottom return and reference **
**  the code above to see what each element does. Most    **
**  of this code is taken straight from Material-UI's     **
**  website.                                              **
**                                                        **
************************************************************
***********************************************************/



import { Container, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import ChatIcon from '@material-ui/icons/Chat';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Link as RouterLink, useHistory } from 'react-router-dom';
import { theme } from '../../Theme/Theme';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  name: {
    padding: 15,
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    margin: 0,
  },
  drawer: {
    margin: 0,
    padding: 0,
  },
});


// This function creates a custom component to use for each link
function ListItemLink(props) {
  const { icon, primary, to } = props;

  // This makes the link itself
  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <Router><RouterLink to={to} ref={ref} {...itemProps} /></Router>),
    [to],
  );
  // This puts the link in a ListItem as a button component
  return (
    <li>
      <ListItem button={true} component={renderLink}>
        {/* If there is an icon for the link this will render it in front of the text */}
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        {/* This is the text for the link */}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

// This sets the type for each argument passed into the ListItemLink component
// constructed above
ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};


export default function Drawer() {

  const dispatch = useDispatch();
  const history = useHistory();

  //sets the default menu drawer location to false
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const user = useSelector(store => store.user)

  // This function toggles whether the drawer is displayed or not
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // This is the logs out the user then forwards them back to the log in page when
  // "Logout" is clicked
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  // This sets up the list of links that are rendered when the drawer is open
  const list = (anchor) => (
    <Container className={classes.drawer}>
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <Typography className={classes.name}>{user.first_name + ' ' + user.last_name}</Typography>
        <Divider />
        <List>
          <ListItemLink to="/home" primary="Home" icon={<HomeIcon />} />
          {/* the followwing three elements determine menu options 
          that should be loaded based on authorization level */}
          {user.authorization > 1 &&
            <ListItemLink to="/profile" primary="Profile" icon={<AccountCircleIcon />} />
          }
          {user.authorization === 1 &&
            <ListItemLink to="/managepyramids" primary="Manage Pyramids" icon={<ChangeHistoryIcon />} />
          }
          {user.authorization === 3 &&
            <ListItemLink to="/message" primary="Chat With Coach" icon={<ChatIcon />} />
          }
        </List>
        {/* This divider renders a dividing line between the page nagivation links and the user account links */}
        <Divider />
        {!user.email ?
          // The following link only displays if a user is not logged in and the remaining links after the colon are rendered when a user is logged in
          <ListItemLink to="/login" primary="Login" /> :
          <>
            <ListItem button={true} onClick={() => handleLogout()}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItem></>}
      </div>
    </Container>
  );

  // sets where the drawer will open from
  const anchor = 'left'

  // The return statement takes all the elements described above and puts them
  // together with the MenuIcon.
  return (
    <div>
      <React.Fragment key={anchor}>
        <Button onClick={toggleDrawer(anchor, true)}><MenuIcon className={classes.menu} /></Button>
        <SwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}
        >
          {list(anchor)}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
