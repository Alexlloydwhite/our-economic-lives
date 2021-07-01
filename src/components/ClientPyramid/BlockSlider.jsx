// React
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// M-UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
// Styling
const useStyles = makeStyles((theme) => ({
  root: { // root styles the div, background of building block list
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default,
  },
  gridList: { // gridList styles the list of building blocks
    flexWrap: 'nowrap', // makes the list horizontal
    transform: 'translateZ(0)', // recommended by m-ui
    padding: '.5rem',
    width: '80%',
  },
  card: { // card styles the building blocks
    width: '95%',
    height: '95%',
    background: 'linear-gradient(45deg, #3ca6fe 40%, #cdecfa 90%)',
    margin: '.5rem',
    textAlign: 'center',
  },
  title: {
    marginTop: '2',
    color: theme.palette.primary, 
  },
  arrow: {
    marginTop: '18%',
    fontSize: 35,
    color: theme.palette.primary.main,
  }
}));
 
export default function PyramidTier(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const tierNum = props.tier;
  const user = useSelector(store => store.user);
  const buildingBlocks = useSelector(store => store.buildingBlocks);
  console.log('buildingBlocks:', buildingBlocks);

  // Click handler to capture block id and dispatch to detail store
  const handleClick = (id) => {
    dispatch({ type: 'SET_DETAIL', payload: id });
    history.push(`/blockDetail/${id}`);  
  }

  // console.log('in Block slider for tier', tierNum, 'as', user);
  return (
    <div className={classes.root} >
      {/* Left Arrow */}
      <ArrowBackIosIcon className={classes.arrow} />
      {/* List of Blocks */}
      <GridList className={classes.gridList} cols={1.1} > 
        {buildingBlocks ? buildingBlocks.map((block) => (
          /* Invidual Blocks */
          <GridListTile key={block.id}>
            <Card className={classes.card} variant="outlined"
              onClick={(e) => handleClick(block.id)}>
              <CardContent className={classes.title}>
                <Typography variant="h4">{block.name}</Typography>
              </CardContent>
            </Card>
          </GridListTile>
        )):''}
      </GridList>
      {/* Right Arrow */}
      <ArrowForwardIosOutlinedIcon className={classes.arrow} />
    </div>
  );
}