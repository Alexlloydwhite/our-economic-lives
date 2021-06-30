import { Typography, TextField } from "@material-ui/core";



export default function CoachComments() {
    return (
        <div>
            <Typography >Coach Comments!</Typography>
            <TextField
                label="Add a Critical Experience"
                multiline
                rows={5}
                variant="outlined"
                // value={newExp}
            />
        </div>
    )
}