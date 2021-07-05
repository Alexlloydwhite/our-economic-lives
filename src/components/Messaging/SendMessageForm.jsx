import {
    Grid,
    TextField,
    Button
} from '@material-ui/core';
import { useState } from 'react';

export default function SendMessageForm() {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        
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