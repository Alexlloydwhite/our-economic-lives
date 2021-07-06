import RecommendedBuildBlocks from "./RecommendBuildBlocks/RecommendedBuildBlocks";
import CoachCritExpReview from './CoachCritExpReviews/CoachCritExpReview';
import Messaging from '../Messaging/Messaging';
import { useState } from 'react';
// MUI
import {
    Tab,
    Tabs,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// Styles
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
    },
    container: {
        width: 'auto',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        [theme.breakpoints.up(1000 + theme.spacing(2) * 2)]: {
            width: 1000,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    chip: {
        padding: theme.spacing(0.5)
    },
}));

function TabPanel(props) {
    const { children, value, index } = props;
    return (
        <div>
            {value === index && (
                <>
                    {children}
                </>
            )}
        </div>
    );
}

export default function ManageClient() {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleTabChange = (e, value) => {
        setValue(value);
    }

    return (
        <div className={classes.root}>
            <Tabs
                value={value}
                onChange={handleTabChange}
                centered
            >
                <Tab label="Chat" />
                <Tab label="Critical Experiences" />
                <Tab label="Building Blocks" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Messaging />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CoachCritExpReview classes={classes} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <RecommendedBuildBlocks classes={classes} />
            </TabPanel>
        </div>
    );
}