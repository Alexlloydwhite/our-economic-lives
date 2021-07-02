import {
  Card,
  CardContent,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { theme } from '../Theme/Theme'

export default function BlockSliderButton(props) {
  const block = props.block

  const getColor = () => {
    if (block.approved != 5) {
      return theme.palette.primary.main;
    } else {
      return theme.palette.success.main;
    };
  };

  const useStyles = makeStyles({
    card: { // card styles the building blocks
      width: '95%',
      height: '95%',
      background: getColor(),
      margin: '.5rem',
      textAlign: 'center',
    },
    title: {
      marginTop: '2',
      color: theme.palette.primary, 
    },
  })

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();


  // Click handler to capture block id and dispatch to detail store
    const handleClick = (id) => {
      dispatch({ type: 'SET_DETAIL', payload: id });
      history.push(`/blockDetail/${id}`);  
    }

  return (
    <Card className={classes.card} variant="outlined"
              onClick={(e) => handleClick(block.id)}>
              <CardContent className={classes.title}>
                <Typography variant="h4">{block.name}</Typography>
              </CardContent>
            </Card>
  )
}