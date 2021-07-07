// React
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// M-UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
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
        background: theme.palette.primary.main,
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

export default function RecommendedBlocks() {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const blocks = useSelector((store) => store.clientBlocks);
    const user_id = useSelector((store) => store.user.id);

    // send user to recommended block detail using history, params
    const handleClick = (id) => {
        console.log('in rec click', id);
        // dispatch selected block details to be stored detail reducer
        dispatch({ type: 'SET_DETAIL', payload: id });
        history.push(`/blockDetail/${id}`); 
    }

    return (
        
    <div className={classes.root} >
      {/* Left Arrow */}
      <ArrowBackIosIcon className={classes.arrow} />
      {/* List of Blocks */}
      <GridList className={classes.gridList} cols={1.1} > 
      {blocks ? blocks.map((block) => {
        // Checking for recommended building blocks
        if( block.is_recommended === true ) {
            return (
          /* Invidual Blocks */
          <GridListTile key={block.id}>
            <Card className={classes.card} variant="outlined"
                onClick={() => handleClick(block.id)}>
              <CardContent className={classes.title}>
                <Typography variant="h4">{block.name}</Typography>
              </CardContent>
            </Card>
          </GridListTile>
          )
        }
        }):'No recommended building blocks!'}
      </GridList>
      {/* Right Arrow */}
      <ArrowForwardIosOutlinedIcon className={classes.arrow} />
    </div>
  )
}