import {useDispatch, useSelector} from 'react-redux';

import { Typography, TextField } from "@material-ui/core";
import Card from '@material-ui/core/Card';




export default function CoachComments() {

    const comments = useSelector((store) => store.comments);

    console.log('in cc', comments);

    return (
       <div>
        <Card>
            <Typography >{comments.name}</Typography>
            <TextField
                label="Coach comment here"
                multiline
                rows={5}
                variant="outlined"
                value={comments.coach_comments}
            />
       </Card>
    </div>
    )
}