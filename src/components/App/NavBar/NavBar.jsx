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
});

export default function NavBar() {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <AppBar className={classes.navbar}>
        <Toolbar>
          <Drawer className={classes.menuButton} />
          <Typography>Our Economic Lives</Typography>
        </Toolbar>
      </AppBar>   
    </div>
  )
}