import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';


export default function EditCritExp () { 

        const dispatch = useDispatch();
        // const experience = useSelector((store) => store.comments);
        const [editExp, setEditExp] = useState('');
        // Set values in state from block reducer
        setEditExp(experience.user_text)

        // const handleSaveEdit = (event) => {
        //     console.log('clicked Save Edit', event);
        //     dispatch({ type: 'CREATE_EXP', payload: {
        //         user_id: user_id,
        //         block_id: block_id,
        //         user_text: newExp 
        //         }
        //     })
        // }

    
        return (
            <form noValidate autoComplete="off" onSubmit={handleSaveEdit}>
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
                Submit 
            </Button>
            </Box>
        </form>

        )
}