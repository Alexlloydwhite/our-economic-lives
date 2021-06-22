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
        marginTop: theme.spacing(5),
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

    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        cityOfResidence: '',
        currentProfession: '',
        careerPyramid: ''
    });

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const register = () => {
        return 200;
    }

    return (
        <Grid
            container
            component="main"
            className={classes.layout}
        >
            <Grid item xs={12} className={classes.paper}>
                <Avatar className={classes.avatar} style={{ alignSelf: 'center' }} >
                    <img src="/images/OELavatar.png" />
                </Avatar>
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
                    onSubmit={register}
                    noValidate
                >
                    {errors.loginMessage && (
                        <h3 className="alert" role="alert">
                            {errors.loginMessage}
                        </h3>
                    )}
                    <Typography
                        variant="subtitle1"
                        align="center"
                        gutterBottom
                    >
                        Please complete the following required fields
                        in order to register your profile
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="First Name"
                        placeholder="First Name"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Last Name"
                        placeholder="Last Name"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Phone Number"
                        placeholder="Phone Number"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="City of Residence"
                        placeholder="City of Residence"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Current Profession"
                        placeholder="Current Profession"
                    />
                    <FormControl
                        variant="outlined"
                        fullWidth
                        style={{ marginTop: 15 }}
                        required
                        value={careerPyramid}
                    >
                        <InputLabel>Desired Career</InputLabel>
                        <Select
                            value={careerPyramid || ''}
                            onChange={(e) => setCareerPyramid(e.target.value)}
                        >
                            <MenuItem>Career Pyramid 1</MenuItem>
                            <MenuItem>Career Pyramid 2</MenuItem>
                            <MenuItem>Career Pyramid 3</MenuItem>
                            <MenuItem>Career Pyramid 4</MenuItem>
                        </Select>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};