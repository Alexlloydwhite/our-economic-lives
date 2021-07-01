import RecommendedBuildBlocks from "./RecommendBuildBlocks/RecommendedBuildBlocks";
import CoachCritExpReview from './CoachCritExpReview';
import { useState } from 'react';
// MUI
import {
    AppBar,
    Tab,
    Tabs,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// Styles
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
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
            <Tabs value={value} onChange={handleTabChange} centered>
                <Tab label="Recommend Building Blocks" />
                <Tab label="Critical Experiences" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <RecommendedBuildBlocks />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CoachCritExpReview />
            </TabPanel>
        </div>
    );
}