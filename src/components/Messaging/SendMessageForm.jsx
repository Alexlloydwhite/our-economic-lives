// MUI
import {
    Grid,
    TextField,
    Button
} from '@material-ui/core';
// React
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function SendMessageForm() {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const params = useParams();

    const sendMessage = () => {
        dispatch({
            type: 'POST_MESSAGE',
            message: message,
            clientId: params.id
        });
    }

    return (
        <Grid container style={{padding: 10}}>
            <Grid xs={11}>
                <TextField
                    variant="outlined"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid xs={1}>
                <Button
                    variant="contained"
                    style={{ marginLeft: 5 }}
                    onClick={sendMessage}
                    style={{ height: 55 }}
                    color="primary"
                >
                    Send
                </Button>
            </Grid>
        </Grid>
    );
}