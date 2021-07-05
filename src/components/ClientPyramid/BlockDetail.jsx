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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PublishIcon from "@material-ui/icons/Publish";
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import EditIcon from "@material-ui/icons/Edit";
// Styling
const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: '3rem',
        padding: theme.spacing(1),
    },
    description: {
      textAlign: 'Left',
      marginLeft: '1rem',
      padding: theme.spacing(1),
  },
    examples: {
        textAlign: 'Left',
        marginLeft: '6em',
        marginTop: '-4%'
    },
    field: {
        marginLeft: '10%',
        marginTop: '2rem',
        width: '80%',
    },
    field2: {
      marginLeft: '10%',
      marginTop: '1%',
      width: '80%',
  },
    unapproved: {
        backgroundColor: theme.palette.error.main,
      },
    approved: {
        backgroundColor: theme.palette.success.main,
      },
  }));

export default function BlockDetail() {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_BLOCK_DETAIL', payload: id })
    dispatch({ type: 'FETCH_UNAPPROVED', id: user_id, bbId: id })
  }, [])

    const classes = useStyles();
    const experiences = useSelector((store) => store.unapprovedExp);
    const detail = useSelector((store) => store.blockDetails);
    const user = useSelector((store) => store.user);
    const [newExp, setNewExp] = useState('');
    const [newExpError, setNewExpError] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [editExp, setEditExp] = useState('');
    const [editId, setEditId] = useState('');
    const user_id = user.id;
    const block_id = detail.id;
    // console.log('in experiences', experiences);
    // console.log('in detail', detail);

    // Validate skill form
    const validateForm = (e) => {
        e.preventDefault();
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
  
  const handleReview = (xp) => {
    console.log('in handle review', xp);
    setOpenDialog(true), 
    setEditExp(xp.user_text)
    setEditId(xp.id)
  }

  // Once validated send new experience to saga
  const submitEditExp = () => {
    console.log('xp', id);
    dispatch({
      type: "EDIT_EXP",
      payload: {
        user_id: user_id,
        block_id: block_id,
        user_text: editExp,
        id: editId,
      },
    });
    setOpenDialog(false)
  };

  return (
    <>
      <Accordion style={{ marginTop: '-1rem'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
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

        <div style={{ textAlign: 'center', marginTop: '2rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
            <Typography variant="h6">
              Describe an instance that exemplifies {detail.name}.
            </Typography>
        </div>
        <Grid container spacing={1}>
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
          </Grid>
          <Grid item xs={12} >
            <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                size="large"
                style={{ float: 'right', marginRight: '10%', width: '40%'}}
                endIcon={<PublishIcon />}
                onClick={validateForm}
            >
               Submit &nbsp;
            </Button>
        </Grid>
      </Grid>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}> 
            <Typography variant="h6">Submitted Experiences: <b>{experiences.length} / 5</b></Typography>
        </div>
            {experiences.map((xp) => { 
            if( xp.is_approved === false ) {
              return (
                <>
         <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography style={{ textAlign: 'left', marginLeft: '10%', marginTop: '2rem', marginRight: '10%' }}>
                {xp.coach_comments ? <><b>Coach:</b> <i>"{xp.coach_comments}"</i></> : <i>Awaiting Review...</i>}
              </Typography>
            <TextField
                className={classes.field2}
                value={xp.user_text}
                multiline
                rows={5}
                variant="outlined"
            />
          </Grid>
          <Grid item xs={12} >
            <Button 
                type="submit" 
                variant="contained" 
                size="large"
                color="primary"
                style={{ float: 'right', marginRight: '10%', width: '39%' }}
                onClick={() => handleReview(xp)}
                endIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button 
                type="submit" 
                variant="contained" 
                size="large"
                className={classes.unapproved}
                style={{ float: 'left', marginLeft: '10%', width: '39%', marginBottom: '1rem' }}
                onClick={() => handleReview(xp.user_text)}
                endIcon={<ThumbDownIcon />}
            >
              Unapproved
            </Button>
          </Grid>
          </Grid>
            <Dialog open={openDialog}>
                {/* Dialog Title */}
                <DialogTitle style={{ marginBottom: -25 }}>
                    <span
                        style={{ float: 'left', marginTop: 9 }}
                    >
                        {detail.name}
                    </span>
                    <IconButton
                        onClick={() => setOpenDialog(false)}
                        style={{ float: 'right' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {xp.coach_comments ? <b>Coach: "{xp.coach_comments}"</b> : <b>Awaiting Coach Review...</b>}
                    </DialogContentText>
                    <TextField
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={6}
                        value={editExp}
                        onChange={(e) => setEditExp(e.target.value)}
                    />
                </DialogContent>
                <DialogActions >
                    <Button
                        type="submit"
                        size="large"
                        endIcon={<PublishIcon />}
                        variant="contained"
                        color="primary"
                        onClick={submitEditExp}
                        style={{ float: 'right', marginRight: '5%', width: '40%'}}
                    >
                        Resubmit
                    </Button>
                  </DialogActions>
                </Dialog>    
                </>
              )
            } else {
              return (
              <>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography style={{ textAlign: 'left', marginLeft: '10%', marginTop: '2rem' }}>
              {xp.coach_comments ? <><b>Coach:</b> <i>"{xp.coach_comments}"</i></> : <i>Awaiting Review...</i>}
              </Typography> 
              <TextField
                  className={classes.field2}
                  value={xp.user_text}
                  multiline
                  rows={5}
                  variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>  
              <Button 
                  type="submit"
                  size="large"
                  variant="contained" 
                  className={classes.approved}
                  style={{ float: 'right', marginRight: '10%', width: '80%', marginBottom: '1rem' }}
                  endIcon={<ThumbUpIcon />}
              >
                Approved! &nbsp;
              </Button>
            </Grid>
          </Grid>
          </>
            )
          }
        })}
    </>
  );
}
