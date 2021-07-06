import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { Typography, Box } from "@material-ui/core";
import moment from 'moment';
import { useRef } from 'react';

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

    useEffect(() => {
        dispatch({
            type: 'FETCH_MESSAGES',
            clientId: params.id
        });
    }, []);

    return (
        <Box height={430} overflow="auto">
            {messages.map((message) => (
                <>
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
                                    <AlwaysScrollToBottom />
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
                                    <AlwaysScrollToBottom />
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
                                    <AlwaysScrollToBottom />
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
                                    <AlwaysScrollToBottom />
                                </div>
                            }
                        </>
                    }
                </>
            ))}
        </Box>
    );
}