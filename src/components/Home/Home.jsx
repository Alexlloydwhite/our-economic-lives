import { makeStyles, Typography } from "@material-ui/core"
import { theme } from '../Theme/Theme'

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

let progress = [1, 0.8, 0.6, 0.4, 0.2, 0]

const useStyles = makeStyles({
  pyramid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    marginTop: 20,
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
  })

  const classes = useStyles();

  return (
    <div className={classes.tier}>
      <div className={classes.tierTitle}>
        <Typography>Tier {num}</Typography>
      </div>
      <div className={classes.tierProgress}></div>
      <div className={classes.tierRemaining}></div>
    </div>
  )
}

export default function Home() {

  const classes = useStyles();

  return (
    <div className={classes.pyramid}>
      <Tier tier={5} />
      <Tier tier={4} />
      <Tier tier={3} />
      <Tier tier={2} />
      <Tier tier={1} />
    </div>
  )
}