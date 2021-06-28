// React
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
// M-UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Styling
const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '90%',
      },
    },
    title: {
        textAlign: 'Center',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.primary.light,
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
  }));

  const sample = [
    {
      title: 'Interpersonal Skills',
    },
    {
        title: 'Initiative',
    },
    {
        title: 'Ambition',
    },
  ];

export default function BlockDetail () {

    const classes = useStyles();
    // const savedSkills = useSelector((store) => store.savedskills);
    const detail = useSelector((store) => store.detail);
    console.log('in detail', detail);
    const [newSkill, setNewSkill] = useState('');
    const [newSkillError, setNewSkillError] = useState(false);

    // Validate skill form
    const validateForm = (e) => {
        e.preventDefault();
        setNewSkillError(false)
        if (newSkill == ''){
            setNewSkillError(true)
        }
        submitSkill();
    }

    // Once validated send new skill to saga
    const submitSkill = () => {
        console.log('in submitSkill');
        dispatch({
            type: 'ADD_SKILL', payload: {
                            skill: newSkill
            }
        })
        // Clear skill form
        setNewSkill('');
    }


    return (
        <>
        <Card >
          <Typography className={classes.title} variant="h4" >
            {detail.name}
          </Typography>
            {/* <List > */}
                {/* <ListItem className={classes.heading}>
                    <ListItemText primary="Displaying strong moral principles and work ethic"/>
                </ListItem> */}
                {/* {sample.map( example => (
                    <ListItem className={classes.heading}>
                        <ListItemText primary={example.title}/>
                    </ListItem>
                ))} */}
            {/* </List> */}
            </Card>
            <div className={classes.rootz}>
            <Accordion className={classes.rootz}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>
                        {detail.description}
                    </Typography>
                </AccordionSummary>
                <Box ml={2}>
                    <Typography >
                        Examples:
                    </Typography>
                {detail.value.map( example => {
                    return (
                    <AccordionDetails ml={16} >
                    <Typography className={classes.heading}>
                         &nbsp;{example}
                    </Typography>
                </AccordionDetails>
                    )
                })}
                </Box>
            </Accordion>
            </div>
        
        
        <Box className={classes.box}>
            <Typography >
                How do you display {detail.name} in your daily life?
            </Typography>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={validateForm}>
            <TextField
                label="Add a skill"
                multiline
                rows={5}
                variant="outlined"
                value={newSkill}
            />
            <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                size="large" 
                onChange={(e) => setNewSkill(e.target.value)}
            >
                Submit
            </Button>
        </form>
        </Box>

        <div className={classes.box}>
        <Typography >Saved Skills: 1 / 5</Typography>
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
            >
                Comments
            </Button>
            </>
             {/* ))} */}
        </Box>
        </div>
    </>
    )
}