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
        <Grid container>
            <Grid item xs={12} style={{ padding: 10 }}>
                <TextField
                    variant="outlined"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                    variant="outlined"
                    style={{ marginLeft: 5 }}
                    onClick={sendMessage}
                >
                    Send
                </Button>
            </Grid>
        </Grid>
    );
}