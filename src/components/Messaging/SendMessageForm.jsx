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
        if (message) {
            dispatch({
                type: 'POST_MESSAGE',
                message: message,
                clientId: params.id
            });
            setMessage('');
        }
    }

    return (
        <Grid container style={{ padding: 10 }}>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Press enter to send message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                />
            </Grid>
        </Grid>
    );
}