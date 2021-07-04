import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pyramid from './Pyramid';
import RecommendedButton from './RecommendedButton';

export default function ClientPyramid() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_PYRAMID_PROGRESS', payload: user.industry_pyramid});
  }, []);

  const progress = useSelector(store => store.pyramidProgress);

  return (
    <>
      {progress ? <Pyramid progress={progress}/> : ''}
      <RecommendedButton />
    </>
  )
}