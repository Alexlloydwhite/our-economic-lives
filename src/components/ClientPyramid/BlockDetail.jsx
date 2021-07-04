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
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Card,
  CardActions,
  CardContent,
  Divider
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PublishIcon from "@material-ui/icons/Publish";
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from "@material-ui/icons/Comment";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from '@material-ui/icons/Check';
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
        marginTop: '3rem',
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
    const user_id = user.id;
    const block_id = detail.id;
    console.log('in experiences', experiences);

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
  
  const handleReview = (user_text) => {
    setOpenDialog(true), 
    setEditExp(user_text)
  }

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.title}
        >
          <Typography variant="h4">{detail.name}</Typography>
        </AccordionSummary>
                    <Typography className={classes.title}>
                        <b>Description:</b>
                    </Typography>
                    <Typography className={classes.title}>
                        {detail.description}
                    </Typography>
                    <Typography className={classes.title}>
                        <b>Examples:</b>
                    </Typography>
                    {detail ? detail.array_agg.map( examples => {
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
            <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                size="large"
                style={{ float: 'right', marginRight: '10%'}}
                endIcon={<PublishIcon />}
            >
               Submit &nbsp;
            </Button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '5rem' }}> 
            <Typography >Submitted Experiences: <b>{experiences.length} / 5</b></Typography>
        </div>
        <div>
            {experiences.map((xp) => { 
            if( xp.is_approved === false ) {
              return (
                <> 
            <TextField
                className={classes.field}
                label={detail.name}
                value={xp.user_text}
                multiline
                rows={5}
                variant="outlined"
            />
            <Button 
                type="submit" 
                variant="contained" 
                size="large"
                className={classes.unapproved}
                style={{ float: 'right', marginRight: '10%' }}
                onClick={() => handleReview(xp.user_text)} 
                endIcon={<ThumbDownIcon />}
            >
              Unapproved
            </Button>
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
                <form noValidate autoComplete="off" >
                <DialogContent>
                    <DialogContentText>
                        <b>Coach: "{xp.coach_comments}"</b>
                    </DialogContentText>
                    <TextField
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
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
                    >
                        Resubmit
                    </Button>
                  </DialogActions>
                  </form>
                </Dialog>
                </>
              )
            } else {
              return (
              <> 
              <TextField
                  className={classes.field}
                  label={detail.name}
                  value={xp.user_text}
                  multiline
                  rows={5}
                  variant="outlined"
              />
              <Button 
                  type="submit"
                  size="large"
                  variant="contained" 
                  className={classes.approved}
                  style={{ float: 'right', marginRight: '10%' }}
                  endIcon={<ThumbUpIcon />}
              >
                Approved! &nbsp;
              </Button>
              </>
              )
              }
          })}
        </div>
    </>
  );
}
