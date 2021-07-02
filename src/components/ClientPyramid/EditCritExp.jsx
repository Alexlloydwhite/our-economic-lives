import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';


export default function EditCritExp () { 

        const dispatch = useDispatch();
        // const experience = useSelector((store) => store.comments);
        const [editExp, setEditExp] = useState('');
        // Set values in state from block reducer
        setEditExp(experience.user_text)

    
        return (
            <form noValidate autoComplete="off" onSubmit={validateForm}>
            <TextField
                className={classes.field}
                // label={experience.name}
                multiline
                rows={5}
                variant="outlined"
                value={editExp}
                onChange={(e) => setEditExp(e.target.value)}
            />
            <Box className={classes.button}>
            <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                size="large" 
            >
               <PublishIcon />&nbsp; Submit 
            </Button>
            </Box>
        </form>

        )
}