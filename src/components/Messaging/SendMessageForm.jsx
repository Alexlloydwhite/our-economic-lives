import {
    Grid,
    TextField
} from '@material-ui/core';

export default function SendMessageForm() {
    return (
        <Grid container>
            <Grid item xs={12} style={{ padding: 10}}>
                <TextField
                    variant="outlined"
                    fullWidth
                />
            </Grid>
        </Grid>
    );
}