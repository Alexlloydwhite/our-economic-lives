import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography, SwipeableDrawer, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useState } from 'react';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import { theme } from '../../Theme/Theme';
import Drawer from './Drawer';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: theme.palette.primary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    width: '10vw',
  },
  title: {
    width: '90vw',
    textAlign: 'center',
    position: 'absolute',
  },
});

export default function NavBar() {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Drawer className={classes.menuButton} />
        </Toolbar>
      </AppBar>   
    </div>
  )
}