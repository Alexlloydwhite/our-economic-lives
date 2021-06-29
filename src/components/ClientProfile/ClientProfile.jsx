// MUI
import {
    Typography,
    makeStyles,
    TextField,
    Button,
    Grid,
    Select,
    MenuItem,
    InputLabel,
    FormControl
} from '@material-ui/core/';
import SaveIcon from '@material-ui/icons/Save';
// React
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
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
    },
    buttons: {
        marginTop: 20,
        textAlign: 'right'
    },
}));

export default function Profile() {
    const classes = useStyles();
    const history = useHistory();
    const errors = useSelector(store => store.errors);
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);

    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [phoneNum, setPhoneNum] = useState(user.phone_number);
    const [city, setCity] = useState(user.city);
    const [profession, setProfession] = useState(user.current_profession);
    const [career, setCareer] = useState(user.desired_career);

    const careerPaths = useSelector(store => store.career_path);

    useEffect(() => {
        dispatch({ type: 'FETCH_CAREER_PATH' })
    }, [])

    // Handles submit of form
    const saveEdit = (e) => {
        e.preventDefault();

        // Putting all edit changes into a object
        const update = {
            id: user.id, // User can't edit id, grabbing it from reducer for query
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: phoneNum,
            city: city,
            current_profession: profession,
            desired_career: career,
        }
        // Dispatch edits to the update saga
        dispatch({ type: 'UPDATE_CLIENT', payload: update })
        history.push('/home')
    };

    return (

        <Grid
            container
            component="main"
            className={classes.layout}
        >
            <Grid item xs={12} className={classes.paper}>
                {/* Greeting */}
                <Typography
                    component="h3"
                    variant="h4"
                    align="center"
                    gutterBottom
                    style={{ color: '#12ae5b' }}
                >
                    Hello, {user.first_name}{' '}{user.last_name}!
                </Typography>
                {/* Title */}
                <Typography
                    component="h3"
                    variant="h5"
                    align="center"
                    gutterBottom
                    style={{ color: '#12ae5b' }}
                >
                    Update you profile information
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={saveEdit}
                    noValidate
                >
                    {/* hook into errors reducer to display msg */}
                    {errors.registrationMessage && (
                        <h3 className="alert" role="alert">
                            {errors.registrationMessage}
                        </h3>
                    )}
                    {/* First Name */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        name="firstName"
                    />
                    {/* Last Name */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        label="Last Name"
                        value={lastName}
                        required
                        fullWidth
                        onChange={(e) => setLastName(e.target.value)}
                        name="lastName"
                    />
                    {/* Email */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                    />
                    {/* Phone Number */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Phone Number"
                        value={phoneNum}
                        onChange={(e) => setPhoneNum(e.target.value)}
                        name="phoneNumber"
                    />
                    {/* City of Residence */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        name="cityOfResidence"
                    />
                    {/* Current Profession */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Current Profession"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        name="currentProfession"
                    />
                    {/* Desired Career */}
                    <FormControl
                        variant="outlined"
                        fullWidth
                        style={{ marginTop: 15 }}
                        required
                        value={career}
                    >
                        <InputLabel>Industry Pyramid</InputLabel>
                        <Select
                            value={career}
                            name="industry_pyramid"
                            onChange={(e) => setCareer(e.target.value)}
                        >
                            {/* TODO - pull pyramid data from Postgres to display here! */}
                            {/* Here, value is the id of the career pyramid. */}
                            {careerPaths.map((path) => (
                                <MenuItem value={path.id} key={path.id}>{path.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* Div sets margin/position for buttons */}
                    <div className={classes.buttons}>
                        {/* Cancel btn */}
                        <Button
                            variant="outlined"
                            style={{ marginRight: 10 }}
                            onClick={() => history.push('/home')}
                        >
                            Cancel
                        </Button>
                        {/* Save btn */}
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            startIcon={<SaveIcon />}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </Grid>
        </Grid>
    );
};