import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';


const useStyles = makeStyles((theme) => ({
  root: { // root styles the div, background of building block list
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: { // gridList styles the list of building blocks
    flexWrap: 'nowrap', // makes the list horizontal
    transform: 'translateZ(0)', // recommended by m-ui
    padding: '.5rem',
    width: '85%',
  },
  card: { // card styles the building blocks
    width: theme.spacing(34),
    height: theme.spacing(21),
    padding: '.5rem',
    background: 'linear-gradient(to top, rgba(255,130,0,0.7) 0%, rgba(255,130,0,0.3) 70%, rgba(255,130,0,0.1) 100%)',
    margin: theme.spacing(1),
    textAlign: 'center',
  },
  title: {
    marginTop: '1rem',
    color: theme.palette.primary, 
  },
  arrow: {
    marginTop: '16%',
    fontSize: 35,
  }
}));

  // Sample Data
  const tileData = [
    {
      title: 'Interpersonal Skills',
    },
    {
        title: 'Initiative',
    },
    {
        title: 'Ambition',
    },
    {
        title: 'Adaptability & Flexibility',
    },
    {
        title: 'Willingness to Take Risks',
    },
    {
        title: 'Willingness to Learn',
    },
  ];
 
export default function PyramidTier() {
  const classes = useStyles();
  // const history = useHistory();
  // const tier = useSelector((store) => store.tier);

  // const handleClick = (id) => {
  //     history.push(`/block/${id}`);  
  // }


  return (
    <div className={classes.root} >
      <ArrowBackIosIcon className={classes.arrow} />
      <GridList className={classes.gridList} cols={1.5} > 
        {tileData.map((block) => (
          <GridListTile key={block.id}>
            <Card className={classes.card} variant="outlined">
              {/* onClick={(e) => handleClick(block.id)} */}
              <CardContent className={classes.title}>
                <Typography variant="h4">{block.title}</Typography>
              </CardContent>
            </Card>
          </GridListTile>
        ))}
      </GridList>
      <ArrowForwardIosOutlinedIcon className={classes.arrow} />
    </div>
  );
}