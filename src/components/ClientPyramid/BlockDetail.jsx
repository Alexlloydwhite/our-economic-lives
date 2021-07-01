// React
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
// M-UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useParams } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CoachComments from './CoachComments';
import PublishIcon from '@material-ui/icons/Publish';
import CommentIcon from '@material-ui/icons/Comment';
import EditIcon from '@material-ui/icons/Edit';
// Styling
const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: 'Left',
        marginLeft: '2em',
        padding: theme.spacing(1),
    },
    examples: {
        textAlign: 'Left',
        marginLeft: '6em',
    },
    field: {
        textAlign: 'Center',
        marginLeft: '10%',
        marginTop: '2rem',
        width: '80%',
    },
    button: {
        textAlign: 'Center',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
  }));

export default function BlockDetail () {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_BLOCK_DETAIL', payload: id })
    // dispatch({ type: 'FETCH_UNAPPROVED', id: user_id })
  }, [])

    const classes = useStyles();
    const savedExp = useSelector((store) => store.unapprovedExp);
    const detail = useSelector((store) => store.blockDetails);
    const user = useSelector((store) => store.user);
    console.log('in detail', detail);
    const [newExp, setNewExp] = useState('');
    const [newExpError, setNewExpError] = useState(false);
    const user_id = user.id;
    const block_id = detail.id;
    console.log('in saveXP', savedExp);


    // Validate skill form
    const validateForm = (e) => {
        e.preventDefault();
        setNewExpError(false)
        if (newExp == ''){
            setNewExpError(true)
        }
        submitExp();
    }

    // Once validated send new experience to saga
    const submitExp = () => {
        dispatch({ type: 'CREATE_EXP', payload: {
                 user_id: user_id,
                block_id: block_id,
                user_text: newExp 
        }
    })
        // Clear Critical Experience form
        setNewExp('');
    }

    // Setting state for backdrop 
    const [open, setOpen] = useState(false);
    // Setting handle functions for backdrop functionality
    const handleClose = () => {
        setOpen(false);
    };
    // Grabbing Id and sending to DB to retrieve user/client building blocks
    const handleToggle = (xp) => {
        // dispatch({ type: 'SET_COMMENT_CLIENT', payload: xp })
        setOpen(!open);
    };


    return (
        <>
            <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.title}
                >
                <Typography variant="h4" >
                    {detail.name}
                </Typography>
                </AccordionSummary>

                    <Typography className={classes.title}>
                        <i>Description:</i>
                    </Typography>
                    <Typography className={classes.title}>
                        {detail.description}
                    </Typography>
                    <Typography className={classes.title}>
                        <i>Examples:</i>
                    </Typography>
                    <Typography className={classes.title}>
                    • Situational awareness
                    </Typography>
                    <Typography className={classes.title}>
                    • Business Ethics
                    </Typography>
                    <Typography className={classes.title}>
                    • Communicating
                    </Typography>
                    
                    {/* {detail ? detail.map( examples => {
                        return (
                            <AccordionDetails >
                             <Typography className={classes.examples}>
                                 {examples}
                             </Typography>
                        </AccordionDetails>
                        )
                    }):''} */}
            </Accordion>

        <div style={{ textAlign: 'center', marginTop: '2rem', paddingLeft: '1rem', paddingRight: '1rem' }}> 
            <Typography >
                Describe an instance that exemplifies {detail.name}.
            </Typography>
        </div>
        <form noValidate autoComplete="off" onSubmit={validateForm}>
            <TextField
                className={classes.field}
                label="Add a Critical Experience"
                multiline
                rows={5}
                variant="outlined"
                value={newExp}
                onChange={(e) => setNewExp(e.target.value)}
            />
            <Box className={classes.button}>
            <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                size="large" 
            >
               <PublishIcon />&nbsp; Submit 
            </Button>
            </Box>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '3rem' }}> 
            <Typography >Saved Experiences: {savedExp.length} / 5</Typography>
        </div>
        <div>
            {savedExp.map(xp => (
            <>
            <TextField
                className={classes.field}
                label={detail.name}
                value={xp.user_text}
                multiline
                rows={5}
                variant="outlined"
            />
            <Box className={classes.button}>
             <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                size="large" 
            >
                < EditIcon />
            </Button>
            <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                size="large"
                onClick={() => handleToggle(xp)} 
            >
                <CommentIcon />
            </Button>
            </Box>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <CoachComments />
            </Backdrop>
            </>
            ))}
        </div>
    </>
    )
}