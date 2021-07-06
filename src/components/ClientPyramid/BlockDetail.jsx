// React
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// M-UI
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {
  Typography,
  TextField,
  Grid,
  Button,
  Paper
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
        marginLeft: '6rem',
        marginTop: '-4%'
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
    let { id } = useParams();
    const experiences = useSelector((store) => store.unapprovedExp);
    const detail = useSelector((store) => store.blockDetails);
    const user = useSelector((store) => store.user);
    const [newExp, setNewExp] = useState('');
    const [newExpError, setNewExpError] = useState(false);
    const user_id = user.id;
    const block_id = detail.id;

    useEffect(() => {
      dispatch({ type: 'FETCH_BLOCK_DETAIL', payload: id })
      dispatch({ type: 'FETCH_UNAPPROVED', id: user_id, bbId: id })
    }, [])

    // Validate skill form
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
    // Clear Critical Experience form
    setNewExp("");
  };

  return (
    <>
      <Accordion style={{ marginTop: '-1rem' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={classes.title}
        >
          <Typography variant="h5">{detail.name}</Typography>
        </AccordionSummary >
          <Typography className={classes.description}>
              <b>Description:</b>
              {' '}{detail.description}
          </Typography>
          <Typography className={classes.description}>
              <b>Examples:</b>
          </Typography>
          {detail.array_agg ? detail.array_agg.map( examples => {
              return (
                  <AccordionDetails >
                    <Typography className={classes.examples}>
                    • {examples}
                    </Typography>
              </AccordionDetails>
              )
          }):''}
      </Accordion>
      
      <div className={classes.container}>
          <Grid
              container
              component={Paper}
              variant="outlined"
              direction="row"
              xs={12}
          >
              <Typography variant="h6" style={{ textAlign: 'center', margin: '1rem'}}>
                Describe an instance that exemplifies {detail.name}.
              </Typography>
              <Grid item xs={12}>
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
          </Grid>
          <Grid
              container
              component={Paper}
              variant="outlined"
              direction="row"
              style={{ marginTop: 10, padding: 20 }}
              xs={12}
          >
              <Grid item xs={12}>
                  <Typography variant="h6" style={{ textAlign: 'center', margin: '1rem' }}>
                      Submitted Experiences: <b>{experiences.length} / 5</b>
                  </Typography>
              </Grid>
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
        </div >
    </>
  );
}
