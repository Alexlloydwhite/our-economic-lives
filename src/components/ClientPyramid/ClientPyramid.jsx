import { makeStyles, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pyramid from './Pyramid';
import RecommendedButton from './RecommendedButton';

export default function ClientPyramid() {
  const useStyles = makeStyles({
    text: {
      textAlign: 'center',
    },
  })

  const classes = useStyles();

  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_PYRAMID_PROGRESS', payload: user.industry_pyramid});
  }, []);

  const pyramidProgress = useSelector(store => store.pyramidProgress);

  return (
    <>
      <Typography className={classes.text}>Current Pyramid:</Typography>
      <Typography className={classes.text} variant='h3' component='h1'>{pyramidProgress.pyramid}</Typography>
      {pyramidProgress.progress ? <Pyramid progress={pyramidProgress.progress}/> : ''}
      <RecommendedButton />
    </>
  )
}