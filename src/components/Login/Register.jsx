// MUI
import {
    Typography,
    makeStyles,
    Avatar,
    TextField,
    Button,
    Grid,
    Select,
    MenuItem,
    InputLabel,
    FormControl
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
        marginTop: theme.spacing(0),
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

export default function Register() {
    const classes = useStyles();
    const history = useHistory();
    const errors = useSelector(store => store.errors);
    const dispatch = useDispatch();
    // Local form state
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        cityOfResidence: '',
        currentProfession: '',
        careerPyramid: ''
    });
    // Handles change for inputs
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };
    // Handles submit of form
    const register = (e) => {
        e.preventDefault();
        dispatch({
            type: 'SUBMIT_REGISTER_FORM',
            payload: formState
        });
        history.push('/home');
    };

    return (
        <Grid
            container
            component="main"
            className={classes.layout}
        >
            <Grid item xs={12} className={classes.paper}>
                {/* Logo */}
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
                {/* Remove before build */}
                <pre>
                    {JSON.stringify(formState, null, 2)}
                </pre>
                <form
                    className={classes.form}
                    onSubmit={register}
                    noValidate
                >
                    {/* hook into errors reducer */}
                    {/* TODO: change to register message */}
                    {errors.loginMessage && (
                        <h3 className="alert" role="alert">
                            {errors.loginMessage}
                        </h3>
                    )}
                    {/* Helper instructions */}
                    <Typography
                        variant="subtitle1"
                        align="center"
                        gutterBottom
                    >
                        Please complete the following required fields
                        in order to register your profile
                    </Typography>
                    {/* First Name */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="First Name"
                        placeholder="First Name"
                        onChange={handleChange}
                        name="firstName"
                    />
                    {/* Last Name */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Last Name"
                        placeholder="Last Name"
                        onChange={handleChange}
                        name="lastName"
                    />
                    {/* Phone Number */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Phone Number"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        name="phoneNumber"
                    />
                    {/* City of Residence */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="City of Residence"
                        placeholder="City of Residence"
                        onChange={handleChange}
                        name="cityOfResidence"
                    />
                    {/* Current Profession */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Current Profession"
                        placeholder="Current Profession"
                        onChange={handleChange}
                        name="currentProfession"
                    />
                    {/* Desired Career */}
                    <FormControl
                        variant="outlined"
                        fullWidth
                        style={{ marginTop: 15 }}
                        required
                        value={formState.careerPyramid}
                    >
                        <InputLabel>Desired Career</InputLabel>
                        <Select
                            value={formState.careerPyramid || ''}
                            name="careerPyramid"
                            onChange={handleChange}
                        >
                            {/* Here, value is the id of the career pyramid. */}
                            <MenuItem value={1}>Mechanic</MenuItem>
                            <MenuItem value={2}>Batman</MenuItem>
                            <MenuItem value={3}>Doctor</MenuItem>
                            <MenuItem value={4}>Lawyer</MenuItem>
                        </Select>
                    </FormControl>
                    {/* Div sets margin/position for buttons */}
                    <div style={{ marginTop: 20, textAlign: 'right' }}>
                        {/* Cancel btn */}
                        <Button
                            variant="outlined"
                            color="error"
                            style={{ marginRight: 10 }}
                            onClick={()=>history.push('/login')}
                        >
                            Cancel
                        </Button>
                        {/* Submit btn */}
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Register
                        </Button>
                    </div>
                </form>
            </Grid>
        </Grid>
    );
};