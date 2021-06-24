import React from 'react';
import { useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
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
    // const history = useHistory();
    // const recommendations = useSelector((store) => store);

    // const handleClick = (id) => {
    //     history.push(`/block/${id}`);  
    // }

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
                        className={classes.content}>
                        {/* onClick={(e) => handleClick(recommended.id)} */}
                        {recommended.block}
                    </Button>
                ))}
            </CardContent>
        </Card>
    )
}