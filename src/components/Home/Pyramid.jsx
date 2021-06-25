// React
import React, {useState} from 'react'
import BlockSlider from './BlockSlider'
// MUI
import { makeStyles, Typography } from "@material-ui/core"
import { theme } from '../Theme/Theme'
import Backdrop from '@material-ui/core/Backdrop'



const getLeftBoarderColor = (leftWidth) => {
  if (leftWidth > 0) {
    return '100px solid ' + theme.palette.success.main;
  } else {
    return '100px solid ' + theme.palette.secondary.main;
  }
}

const getRightBoarderColor = (rightWidth) => {
  if (rightWidth > 0) {
    return '100px solid ' + theme.palette.secondary.main;
  } else {
    return '100px solid ' + theme.palette.success.main;
  }
}

let progress = [1, 0.8, 0.6, 0.4, 0.2, 0.4, 0.6]

const useStyles = makeStyles({
  pyramid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    marginTop: 20,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  tier6: {
    display: 'flex',
    flexDirection: 'column',
    height: 210,
    width: 145,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 0,
    marginRight: 5,
  },
  tier6Title: {
    zIndex: 1000,
  },
  tier6Remaining: {
    marginBottom: 210 * progress[6 - 1],
    width: 145 - 20 * progress[6 - 1],
    marginLeft: 20 * progress[6 - 1],
    borderBottom: (210 - 210 * progress[6 - 1]) + 'px solid ' + theme.palette.secondary.main,
    borderLeft: 20 - 20 * progress[6 - 1] + 'px solid transparent',
    zIndex: 500,
    position: 'absolute',
  },
  tier6Progress: {
    width: 145,
    marginTop: 210 - 210 * progress[6 - 1],
    borderLeft: 20 * progress[6 - 1] + 'px solid transparent',
    borderBottom: (210 * progress[6 - 1]) + 'px solid ' + theme.palette.success.main,
    zIndex: 500,
    position: 'absolute',
  },
  tier7: {
    display: 'flex',
    flexDirection: 'column',
    height: 210,
    width: 145,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 0,
    marginLeft: 5,
  },
  tier7Title: {
    zIndex: 1000,
  },
  tier7Remaining: {
    marginBottom: 210 * progress[7 - 1],
    width: 145 - 20 * progress[7 - 1],
    marginRight: 20 * progress[7 - 1],
    borderBottom: (210 - 210 * progress[7 - 1]) + 'px solid ' + theme.palette.secondary.main,
    borderRight: 20 - 20 * progress[7 - 1] + 'px solid transparent',
    zIndex: 500,
    position: 'absolute',
  },
  tier7Progress: {
    width: 145,
    marginTop: 210 - 210 * progress[7 - 1],
    borderRight: 20 * progress[7 - 1] + 'px solid transparent',
    borderBottom: (210 * progress[7 - 1]) + 'px solid ' + theme.palette.success.main,
    zIndex: 500,
    position: 'absolute',
  },
});

function Tier(props) {
  let num = props.tier;
  const width = 400 - ((num - 1) * 20);

  const tierProgress = progress[num -1];
  const tierRemaining = 1 - progress[num -1];

  const useStyles = makeStyles({
    tier: {
      display: 'flex',
      flexDirection: 'row',
      width: width,
      marginBottom: 10,
    },
    tierTitle: {
      zIndex: 100,
      position: 'absolute',
      textAlign:'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: width,
      height: 100,
    },
    tierRemaining: {
      borderBottom: getRightBoarderColor(tierRemaining),
      borderRight: '10px solid transparent',
      height: 100,
      width: tierRemaining * 100 + '%',
      zIndex: 0,
    },
    tierProgress: {
      borderBottom: getLeftBoarderColor(tierProgress),
      borderLeft: '10px solid transparent',
      height: 100,
      width: tierProgress * 100 + '%',
      zIndex: 0,
    },
    backdrop: { 
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })

  const classes = useStyles();

  // Setting state for backdrop 
  const [open, setOpen] = useState(false);
  // Setting handle functions for backdrop functionality
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    // console.log('clicked pyramid', num);
    setOpen(!open);
  };

  return (
    <div className={classes.tier}  onClick={handleToggle}>
      <div className={classes.tierTitle}>
        <Typography>Tier {num}</Typography>
      </div>
      <div className={classes.tierProgress}></div>
      <div className={classes.tierRemaining}></div>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
            <BlockSlider />
        </Backdrop>
    </div>
  )
}

export default function Home() {

  const classes = useStyles();

  return (
    <div className={classes.pyramid}>
      <div className={classes.row}>
        <div className={classes.tier6}>
          <Typography className={classes.tier6Title}>Tier 6</Typography>
          <div className={classes.tier6Remaining}></div>
          <div className={classes.tier6Progress}></div>
        </div>
        <div className={classes.tier7}>
          <Typography className={classes.tier7Title}>Tier 7</Typography>
          <div className={classes.tier7Remaining}></div>
          <div className={classes.tier7Progress}></div>
        </div>
      </div>
      <Tier tier={5} />
      <Tier tier={4} />
      <Tier tier={3} />
      <Tier tier={2} />
      <Tier tier={1} />
    </div>
  )
}