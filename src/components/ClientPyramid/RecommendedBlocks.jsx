// React
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// M-UI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// Styling
const useStyles = makeStyles((theme) => ({
    content: { 
        margin: '1rem',
        alignItems: 'center'
    },
  }));

export default function RecommendedBlocks() {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const blocks = useSelector((store) => store.clientBlocks);
    const user_id = useSelector((store) => store.user.id);
    console.log('in reBB block', blocks);
    console.log('in reBB user', user_id);

    // send user to recommended block detail using history, params
    const handleClick = (id) => {

        // const id = {
        //     buildingBlockId: block_id, 
        //     userId: user_id 
        // }
        console.log('in rec click', id);
        // dispatch selected block details to be stored detail reducer
        // dispatch({ type: 'FETCH_DETAIL', payload: id });
        dispatch({ type: 'SET_DETAIL', payload: id });
        history.push(`/blockDetail/${id.id}`); 
        // history.push(`/blockDetail`); 
    }

    return (
        <Card >
            <CardContent>
                {/* Helper Text */}
                <Typography variant="h5" >
                    Recommended Building Blocks:
                </Typography>
                {/* Iterate through client blocks to check if recommended, and render if true */}
                {blocks.map((block, i) => {
                    if( block.is_recommended === true ) {
                        return (
                            <Button 
                            key={i}
                            variant="contained" 
                            color="primary" 
                            className={classes.content}
                            onClick={() => handleClick(block)}
                            >
                            {block.name}
                        </Button>
                        )
                    }
                })}
            </CardContent>
        </Card>
    )
}