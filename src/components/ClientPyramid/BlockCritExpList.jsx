import React, { useState } from "react";
import { useDispatch } from "react-redux";
// M-UI
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Divider
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PublishIcon from "@material-ui/icons/Publish";
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import EditIcon from "@material-ui/icons/Edit";

export default function BlockCritExpList({ xp, classes, detail, user_id, block_id }) {

    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [editExp, setEditExp] = useState('');
    const [editId, setEditId] = useState('');

    const handleReview = (xp) => {
        setOpenDialog(true), 
        setEditExp(xp.user_text)
        setEditId(xp.id)
      }
    
      // Once validated send new experience to saga
      const submitEditExp = () => {
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
    <Card variant="outlined" style={{ width: '100%', marginBottom: '1rem'}}>
        <CardContent>
            <Typography style={{ textAlign: 'left', marginRight: '10%' }}>
                {xp.coach_comments ? <><b>Coach:</b> <i>"{xp.coach_comments}"</i></> : <i>Awaiting Review...</i>}
            </Typography>
            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
            <Typography >
                {xp.user_text}
            </Typography>
        </CardContent>
        <CardActions>
            {xp.is_approved === false ? 
            <>
                <Button 
                    type="submit" 
                    variant="contained" 
                    className={classes.unapproved}
                    style={{ width: '50%' }}
                    onClick={() => handleReview(xp.user_text)}
                    endIcon={<ThumbDownIcon />}
                >
                    Unapproved
                </Button>
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    style={{ width: '50%' }}
                    onClick={() => handleReview(xp)}
                    endIcon={<EditIcon />}
                >
                    Edit
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
                :
                <Button 
                    type="submit"
                    variant="contained" 
                    className={classes.approved}
                    style={{ width: '100%' }}
                    endIcon={<ThumbUpIcon />}
                >
                    Approved!
                </Button>
            }
        </CardActions>
    </Card>
    </>
    )
}