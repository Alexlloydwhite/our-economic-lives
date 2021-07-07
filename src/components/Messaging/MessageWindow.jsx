import { Box, Typography } from "@material-ui/core";
import moment from 'moment';
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// This sub component adds a scroll to bottom effect to the chat window
// Because the chat window is "scroll-able" we want to see the newest message
// (bottom of window) on page load or state change
const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
}

export default function MessageWindow({ classes }) {
    const dispatch = useDispatch();
    const params = useParams();
    const messages = useSelector(store => store.messages);
    const user = useSelector(store => store.user);
    // Fetch messages on page load
    useEffect(() => {
        dispatch({
            type: 'FETCH_MESSAGES',
            clientId: params.id
        });
    }, []);

    return (
        // Box holds message window and sets max height
        <Box height={430} overflow="auto">
            {/* Map array of messages onto DOM */}
            {messages.map((message) => (
                <>
                    {/* 
                        Check user auth level & further checks are used to 
                        determine how to format messages. 
                        (what side of the window do they appear on?)
                        MomentJS is used to properly format dates.
                    */}
                    {user.authorization_level === 2 ?
                        <>
                            {message.id_sender === Number(params.id) ?
                                <div
                                    key={message.id}
                                    className={classes.messageLeft}
                                >
                                    <Typography variant="caption">
                                        {moment(message.send_date).format('h:mm a, MMMM Do YYYY')}
                                    </Typography>
                                    <Typography variant="h6">
                                        {message.text}
                                    </Typography>
                                </div>
                                :
                                <div
                                    key={message.id}
                                    className={classes.messageRight}
                                >
                                    <Typography variant="caption">
                                        {moment(message.send_date).format('h:mm a, MMMM Do YYYY')}
                                    </Typography>
                                    <Typography variant="h6">
                                        {message.text}
                                    </Typography>
                                </div>
                            }
                        </>
                        :
                        <>
                            {message.id_sender === user.id ?
                                <div
                                    key={message.id}
                                    className={classes.messageRight}
                                >
                                    <Typography variant="caption">
                                        {moment(message.send_date).format('h:mm a, MMMM Do YYYY')}
                                    </Typography>
                                    <Typography variant="h6">
                                        {message.text}
                                    </Typography>
                                </div>
                                :
                                <div
                                    key={message.id}
                                    className={classes.messageLeft}
                                >
                                    <Typography variant="caption">
                                        {moment(message.send_date).format('h:mm a, MMMM Do YYYY')}
                                    </Typography>
                                    <Typography variant="h6">
                                        {message.text}
                                    </Typography>
                                </div>
                            }
                        </>
                    }
                </>
            ))}
            {/* Provides auto scroll to bottom effect on state change or page load */}
            <AlwaysScrollToBottom />
        </Box>
    );
}