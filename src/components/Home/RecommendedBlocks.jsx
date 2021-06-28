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

    // send user to recommended block detail using history, params
    const handleClick = (id) => {
        console.log('Recommended block clicked', id);
        dispatch({ type: 'SET_DETAIL', payload: id });
        history.push(`/blockDetail/${id}`);  
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
                            onClick={() => handleClick(i)}
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