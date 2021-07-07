// React
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// M-UI
import {
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Grid,
  Button,
  Paper,
} from '@material-ui/core';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PublishIcon from "@material-ui/icons/Publish";
import BlockCritExpList from "./BlockCritExpList";
// Styling
const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: '1rem',
        padding: theme.spacing(1),
    },
    description: {
        textAlign: 'Left',
        marginLeft: '1rem',
        padding: theme.spacing(1),
    },
    examples: {
        textAlign: 'Left',
        marginLeft: '5%',
        marginTop: '-1%'
    },
    field: {
        marginLeft: '5%',
        width: '90%',
    },
    unapproved: {
        backgroundColor: theme.palette.secondary.light,
    },
    approved: {
        backgroundColor: theme.palette.success.main,
    },
    container: {
        width: 'auto',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        [theme.breakpoints.up(1000 + theme.spacing(2) * 2)]: {
            width: 1000,
            marginLeft: 'auto',
            marginRight: 'auto',
      }
    },
  }));

export default function BlockDetail() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [newExp, setNewExp] = useState('');
    const [newExpError, setNewExpError] = useState(false);
    const user = useSelector((store) => store.user);
    const detail = useSelector((store) => store.blockDetails);
    const experiences = useSelector((store) => store.unapprovedExp);
    // Using params and declaring ids that will be used to GET/POST Critical Experiences (CE)
    let { id } = useParams();
    const user_id = user.id;
    const block_id = detail.id;

    // On page load, grabbing Building Block details, and user submitted Critical Experiences (CE) from DB
    useEffect(() => {
        dispatch({ type: 'FETCH_BLOCK_DETAIL', payload: id })
        dispatch({ type: 'FETCH_UNAPPROVED', id: user_id, bbId: id })
    }, [])

    // Validate CE textfield input
    const validateForm = (e) => {
        setNewExpError(false)
        if (newExp === ''){
          setNewExpError(true)
        }
        else {
          submitExp();
        }
    }

    // Once validated send new experience to saga
    const submitExp = () => {
      dispatch({
        type: "CREATE_EXP",
        payload: {
          user_id: user_id,
          block_id: block_id,
          user_text: newExp,
        },
      });
      // Clear CE textfield
      setNewExp("");
    };

    return (
        <> 
        {/* Accordian feature displays Building Block details */}
        <Accordion style={{ marginTop: '-1rem' }}>
            {/* Title */}
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.title}
            >
                <Typography variant="h5">{detail.name}</Typography>
            </AccordionSummary >
            {/* Description */}
            <Typography className={classes.description}>
                <b>Description:</b>
                {' '}{detail.description}
            </Typography>
            {/* Examples */}
            <Typography className={classes.description}>
                <b>Examples:</b>
                {detail.array_agg ? detail.array_agg.map( examples => {
                    return (
                        <AccordionDetails className={classes.examples}>
                          • {examples}
                        </AccordionDetails>
                    )
                }):''}
            </Typography>
        </Accordion>

        {/* Div contains layout settings for CE input and submitted CE display*/}
        <div className={classes.container}>
            {/* Setting Grid for CE input/POST */}
            <Grid
                container
                component={Paper}
                variant="outlined"
                direction="row"
                xs={12}
            >   
                {/* Checking if building block is completed */}
                { experiences.length < 6 ?
                <>
                {/* CE Textfield Helper Text */}
                <Typography variant="h6" style={{ textAlign: 'center', margin: '1rem'}}>
                  Describe an instance that exemplifies {detail.name}.
                </Typography>
                <Grid item xs={12}>
                    {/* CE Textfield */}
                    <TextField
                        className={classes.field}
                        label="Add a Critical Experience"
                        multiline
                        rows={5}
                        variant="outlined"
                        value={newExp}
                        error={newExpError}
                        onChange={(e) => setNewExp(e.target.value)}
                    />
                    {/* Submit Btn */}
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        style={{ float: 'right', marginRight: '5%', width: '45%', marginTop: '2%', marginBottom: '1rem'}}
                        endIcon={<PublishIcon />}
                        onClick={validateForm}
                    >
                      Submit &nbsp;
                    </Button>
                </Grid>
                </>
                :
                <>
                {/* Success Message */}
                <Typography variant="h6" style={{ textAlign: 'center', margin: '1rem'}}>
                    Success! You have completed the {detail.name} building block!
                </Typography>
                </>
                }
            </Grid>
            {/* Setting Grid for displaying submitted CE's */}
            <Grid
                container
                component={Paper}
                variant="outlined"
                direction="row"
                style={{ marginTop: 10, padding: 20 }}
                xs={12}
            >
                <Grid item xs={12}>
                    {/* Submitted CE Helper Text */}
                    <Typography variant="h6" style={{ textAlign: 'center', margin: '1rem' }}>
                        Submitted Experiences: <b>{experiences.length} / 5</b>
                    </Typography>
                </Grid>
                {/* .Mapping through BlockCritExpList component (submitted CE's)  */}
                {experiences.map((xp) => (
                    <BlockCritExpList
                        xp={xp}
                        detail={detail}
                        classes={classes}
                        user_id={user_id}
                        block_id={block_id}
                    />
                ))}
            </Grid>
        </div>
        </>
    );
}
