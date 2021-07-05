import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { Typography, Box } from "@material-ui/core";

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
        <Box height={450} overflow="auto">
            {messages.map((message) => (
                <>
                    {user.authorization_level === 2 ?
                        <>
                            {message.id_sender === Number(params.id) ?
                                <div className={classes.messageLeft}>
                                    <Typography variant="caption">
                                        {message.send_date}
                                    </Typography>
                                    <Typography variant="h6">
                                        {message.text}
                                    </Typography>
                                </div>
                                :
                                <div className={classes.messageRight}>
                                    <Typography variant="caption">
                                        {message.send_date}
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
                                <div className={classes.messageRight}>
                                    <Typography variant="caption">
                                        {message.send_date}
                                    </Typography>
                                    <Typography variant="h6">
                                        {message.text}
                                    </Typography>
                                </div>
                                :
                                <div className={classes.messageLeft}>
                                    <Typography variant="caption">
                                        {message.send_date}
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
        </Box>
    );
}