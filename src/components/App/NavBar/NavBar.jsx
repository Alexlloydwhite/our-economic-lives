import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography
} from '@material-ui/core';
import { theme } from '../../Theme/Theme';
import Drawer from './Drawer';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginBottom: 58
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
  const user = useSelector(store => store.user)

  return (
    <div className={classes.root}>
      <AppBar className={classes.navbar}>
        <Toolbar>
          {user.first_name &&
            <Drawer className={classes.menuButton} />
          }
          <Typography>Our Economic Lives</Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}