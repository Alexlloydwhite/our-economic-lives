import {
    Typography,
    TextField,
    Button,
    Box,
    Grid,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Card,
    CardActions,
    CardContent
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import { useState } from 'react';

export default function CritExpReviewCard({ experience, classes }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [coachComment, setCoachComment] = useState('');

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {experience.name}
                </Typography>
                <Typography variant="subtitle2">
                    "{experience.user_text}"
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    endIcon={<ThumbUpIcon />}
                >
                    Approve
                </Button>
                <Button
                    size="small"
                    onClick={() => setOpenDialog(true)}
                    endIcon={<CommentIcon />}
                >
                    Comment
                </Button>
            </CardActions>
            <Dialog open={openDialog}>
                {/* Dialog Title */}
                <DialogTitle style={{ marginBottom: -25 }}>
                    <span
                        style={{ float: 'left', marginTop: 9 }}
                    >
                        {experience.name}
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
                        Critical Experience: <br />
                        {experience.user_text}
                    </DialogContentText>
                    <TextField
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={3}
                        value={coachComment}
                        onChange={(e) => setCoachComment(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button>
                        Add Comment
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}