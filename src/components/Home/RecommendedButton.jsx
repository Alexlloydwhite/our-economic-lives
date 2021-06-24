import React, {useState} from 'react';
import RecommendedBlocks from './RecommendedBlocks';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    button: {
      textAlign: 'center',
      margin: '1rem',
    }
  }));

export default function RecommendedButton() {
  const classes = useStyles();

  // Setting state for backdrop 
  const [open, setOpen] = useState(false);
  // Setting handle functions for backdrop functionality
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
     <div className={classes.button}>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleToggle}
          >
            Recommended Building Blocks
        </Button>
        <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
            <RecommendedBlocks />
        </Backdrop>
     </div>
    </>
  )
}