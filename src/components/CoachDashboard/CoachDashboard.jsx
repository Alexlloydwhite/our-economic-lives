import { 
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
 } from '@material-ui/core';

export default function CoachDashboard() {
    return (
        <div style={{ textAlign: 'center' }}>
            <Typography>
                You may have a maximum of 8 clients on your team
            </Typography>
            <Button>Invite a new client to your team</Button>
        </div>
    );
};