import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '90%',
      },
    },
    heading: {
        textAlign: 'Center',
        padding: theme.spacing(1),
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
    // const savedBlocks = useSelector((store) => store.savedskills);
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
        <Card className={classes.heading}>
          <Typography variant="h4" >
            Integrity
          </Typography>
            <List >
            {sample.map( example => (
                    <ListItem className={classes.heading}>
                        <ListItemText primary={example.title}/>
                    </ListItem>
                ))}
            </List>
        </Card>
        
        <Box className={classes.box}>
            <Typography >
                How do you display Integrity in your daily life?
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
                Submit for coach review
            </Button>
        </form>
        </Box>

        <div className={classes.box}>
        <Typography >Saved Skillz: 1 / 5</Typography>
        <Box className={classes.root}>
            {/* {savedskills.map(skill => ( */}
            <>
            <TextField
                label="My Jedi skillz are on point"
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