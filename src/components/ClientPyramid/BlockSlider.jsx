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
import BlockSliderButton from './BlockSliderButton';

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
    padding: '.4rem',
    overflow: 'scroll',
    width: '70vw',
  },
  arrow: {
    marginTop: '18%',
    marginLeft: '5px',
    marginRight: '5px',
    fontSize: 35,
    color: theme.palette.primary.main,
  }
}));

  const currentColor = () => {
    return 'linear-gradient(45deg, #3ca6fe 40%, #cdecfa 90%)'
  }
 
export default function PyramidTier(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const tierNum = props.tier;
  const user = useSelector(store => store.user);
  const buildingBlocks = useSelector(store => store.buildingBlocks);
  const user_id = user.id;
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
            <BlockSliderButton block={block} />
          </GridListTile>
        )):''}
      </GridList>
      {/* Right Arrow */}
      <ArrowForwardIosOutlinedIcon className={classes.arrow} />
    </div>
  );
}