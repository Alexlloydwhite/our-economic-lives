// MUI
import {
  Button,
  Grid, makeStyles,
  TextField, Typography
} from '@material-ui/core/';
import SaveIcon from '@material-ui/icons/Save';
// React
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const errors = useSelector(store => store.errors);

    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [phoneNum, setPhoneNum] = useState(user.phone_number);
    const [city, setCity] = useState(user.city);
    const [profession, setProfession] = useState(user.current_profession);
    const [updatePassword, setUpdatePassword] = useState('true');

    const handlePasswordChange = (text) => {
      setUpdatePassword(true);
      setNewPassword(text);
    }

    // Handles submit of form
    const saveEdit = (e) => {
        e.preventDefault();

        // Putting all edit changes into a object
        const update = {
            authorization: user.authorization,
            city: city,
            coach_id: user.coach_id,
            current_profession: profession,
            email: email,
            first_name: firstName,
            id: user.id, // User can't edit id, grabbing it from reducer for query
            industry_pyramid: user.industry_pyramid,
            is_active: user.is_active,
            is_registered: user.is_registered,
            last_name: lastName,
            organization_name: user.organization_name,
            phone_number: phoneNum,
        }

        console.log('update the stupid password all ready AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', updatePassword);
        if (updatePassword) {
          const updateWithPassword = { ...update, password: newPassword}
            if (newPassword === confirmNewPassword) {
                // Dispatch edits to the update saga
                dispatch({ type: 'UPDATE_CLIENT', payload: updateWithPassword });
                setNewPassword('');
                setConfirmNewPassword('');
                history.push('/home');
            } else {
                dispatch({ type: 'SET_NEW_PASSWORD_ERROR' });
            }
        } else {
            // Dispatch edits to the update saga
            dispatch({ type: 'UPDATE_CLIENT', payload: update });
            history.push('/home');
        }
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
                    {errors.changePasswordMessage && (
                        <h3 className="alert" role="alert">
                            {errors.changePasswordMessage}
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
                    {/* Password */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="password"
                        label="New Password"
                        value={newPassword}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        name="password"
                    />
                    {/* Confirm Password */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="password"
                        label="Confirm New Password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        name="confirmPassword"
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
                    {/* Div sets margin/position for buttons */}
                    <div className={classes.buttons}>
                        {/* Cancel btn */}
                        <Button
                            variant="outlined"
                            style={{ marginRight: 10 }}
                            onClick={() => history.push('/home')}
                        >
                            back
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