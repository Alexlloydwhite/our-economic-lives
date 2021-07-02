// MUI
import {
    Typography,
    makeStyles,
    Avatar,
    TextField,
    Button,
    Grid,
    Paper
} from '@material-ui/core/';
// React
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router';
// Styles
const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    avatar: {
        width: 100,
        height: 100,
        marginBottom: theme.spacing(2)
    }
}));

export default function Login() {
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const errors = useSelector(store => store.errors);
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();

    const login = (e) => {
        e.preventDefault();
        // Checks if email & password state is not null
        if (email && password) {
            // Login user with email & password state
            dispatch({
                type: 'LOGIN',
                payload: {
                    username: email,
                    password: password,
                }
            });
            history.push('/home');
        } else {
            // Set error if inputs are missing or not valid
            dispatch({ type: 'LOGIN_INPUT_ERROR' });
        }
    };

    return (
        <Grid
            container
            component="main"
            className={classes.layout}
            component={Paper}
            variant="outlined"
        >
            <Grid
                item
                xs={12}
                className={classes.paper}
            >
                {/* Logo avatar */}
                <Avatar className={classes.avatar} style={{ alignSelf: 'center' }} >
                    <img src="/images/OELavatar.png" />
                </Avatar>
                {/* Title */}
                <Typography
                    component="h3"
                    variant="h4"
                    align="center"
                    gutterBottom
                    style={{ color: '#12ae5b' }}
                >
                    Our Economic Lives
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={login}
                    noValidate
                >
                    {/* Errors display */}
                    {errors.loginMessage && (
                        <h3 className="alert" role="alert">
                            {errors.loginMessage}
                        </h3>
                    )}
                    {/* Input for Username */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="Username"
                        label="Email"
                        name="Username"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    {/* Input for password */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        name="password"
                        label="Password"
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        style={{ marginBottom: 20 }}
                    />
                    {/* Submit button */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Login
                    </Button>
                </form>
                {/* Temp stuff */}
                <h5>Temp testing buttons</h5>
                <button onClick={() => {
                    setEmail('kheart@hotmail.com');
                    setPassword('1234567890');
                }}>registered user</button>
                <button onClick={() => {
                    setEmail('test2');
                    setPassword('test2');
                }}>new user</button>
                <button onClick={() => {
                    setEmail('testcoach');
                    setPassword('testcoach');
                }}>coach</button>
                <button onClick={() => {
                    setEmail('programadmin');
                    setPassword('programadmin');
                }}>admin</button>
            </Grid>
        </Grid>
    );
};