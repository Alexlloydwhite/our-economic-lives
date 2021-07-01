import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography
} from '@material-ui/core';
import { theme } from '../../Theme/Theme';
import Drawer from './Drawer';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginBottom: 70
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

  return (
    <div className={classes.root}>
      <AppBar className={classes.navbar} elevation={1}>
        <Toolbar>
          <Drawer className={classes.menuButton} />
          <Typography>Our Economic Lives</Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}