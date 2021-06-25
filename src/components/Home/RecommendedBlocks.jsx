import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    content: { 
        margin: '1rem',
        alignItems: 'center'
    },
  }));

export default function PyramidTier() {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    // const recommendations = useSelector((store) => store);

    // send user to recommended block detail using history, params
    const handleClick = (id) => {
        console.log('Recommended block clicked', id);
        dispatch({ type: 'SET_DETAIL', payload: id });
        history.push(`/blockDetail/${id}`);  
    }

    const sample = [
        {
            block: 'Demonstrating Sensitivity/Empathy',
          },
          {
            block: 'Demonstrating insight into behavior',
          },
          {
            block: 'Maintaining open relationships',
          },
    ];

    return (
        <Card >
            <CardContent>
                <Typography variant="h5" >
                    Your Recommended Building Blocks
                </Typography>
                {sample.map((recommended) => (
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        className={classes.content}
                        onClick={() => handleClick(recommended.id)}
                        >
                        {recommended.block}
                    </Button>
                ))}
            </CardContent>
        </Card>
    )
}