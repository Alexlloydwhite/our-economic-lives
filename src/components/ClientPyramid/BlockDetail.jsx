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
// Styling
const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '90%',
      },
    },
    title: {
        textAlign: 'Left',
        marginLeft: '2em',
        padding: theme.spacing(1),
    },
    examples: {
        textAlign: 'Left',
        marginLeft: '6em',
    },
    heading: {
        textAlign: 'Left',
        padding: theme.spacing(1),
        alignItems: 'center',
    },
    box: {
        textAlign: 'Center',
        padding: theme.spacing(2),
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
    dispatch({ type: 'FETCH_BLOCK_DETAIL', payload: id})
  }, [])

    const classes = useStyles();
    // const savedSkills = useSelector((store) => store.savedskills);
    const detail = useSelector((store) => store.blockDetails);
    console.log('in detail', detail);
    const [newExp, setNewExp] = useState('');
    const [newExpError, setNewExpError] = useState(false);
    const block_id = detail.id;

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
    // const submitExp = () => {
    //     console.log('in submitExp');
    //     dispatch({
    //         type: 'CREATE_EXP', payload: { 
    //             user_id: user_id,
    //             block_id: detail.id,
    //             user_text: newExp 
    //         }
    //     })
    //     // Clear Critical Experience form
    //     setNewExp('');
    // }

    // Setting state for backdrop 
    const [open, setOpen] = useState(false);
    // Setting handle functions for backdrop functionality
    const handleClose = () => {
        setOpen(false);
    };
    // Grabbing Id and sending to DB to retrieve user/client building blocks
    const handleToggle = () => {
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
                        {detail.description}
                    </Typography>
                    <Typography className={classes.title}>
                        Examples:
                    </Typography>
                    {/* {detail ? detail.array_agg.map( example => {
                        return (
                        <AccordionDetails >
                            <Typography className={classes.examples}>
                                {example}
                            </Typography>
                        </AccordionDetails>
                        )
                    }):''} */}
            </Accordion>
        
        
        <Box className={classes.box}>
            <Typography >
                Describe an instance that exemplifies {detail.name}.
            </Typography>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={validateForm}>
            <TextField
                label="Add a Critical Experience"
                multiline
                rows={5}
                variant="outlined"
                value={newExp}
            />
            <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                size="large" 
                onChange={(e) => setNewSkill(e.target.value)}
            >
                Submit for review
            </Button>
        </form>
        </Box>

        <div className={classes.box}>
        <Typography >Saved Experiences: 1 / 5</Typography>
        {/* <Typography >Saved Skillz: {savedSkills.length} / 5</Typography> */}
        <Box className={classes.root}>
            {/* {savedskills.map(skill => ( */}
            <>
            <TextField
                value="If a coworker asks for help, I will always do my best to help them."
                multiline
                rows={5}
                variant="outlined"
            />
             <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                size="large" 
            >
                Edit
            </Button>
            <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                size="large"
                onClick={handleToggle} 
            >
                Comments
            </Button>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <CoachComments />
            </Backdrop>
            </>
             {/* ))} */}
        </Box>
        </div>
    </>
    )
}