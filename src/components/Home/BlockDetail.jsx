import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '90%',
      },
    },
    card: {
        textAlign: 'Center',
        padding: theme.spacing(1),
    },
    newSkill: {
        textAlign: 'Center',
        width: '90%',
        padding: theme.spacing(1),
    },
  }));

  const tileData = [
    {
      title: 'Interpersonal Skills',
    },
    {
        title: 'Initiative',
    },
    {
        title: 'Ambition',
    },
   
  ];

export default function BlockDetail () {

    const classes = useStyles();

    return (
        <>
        <Card className={classes.card}>
          <Typography variant="h4" >
            Integrity
          </Typography>
            <List >
            {tileData.map( example => (
                    <ListItem className={classes.card}>
                        <ListItemText primary={example.title}/>
                    </ListItem>
                ))}
            </List>
        </Card>
        
        <Box className={classes.card}>
            <Typography >
                How you display Integrity in your daily life?
            </Typography>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                label="Add a skill"
                multiline
                rows={5}
                variant="outlined"
            />
            <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                size="large" 
                // onClick={submitForm}
            >
                Submit for coach review
            </Button>
        </form>
        </Box>

        <div className={classes.card}>
        <Box className={classes.root}>
            <Typography >Saved Skillz: 2 / 5</Typography>
            <TextField
                label="My Jedi skillz are on point"
                multiline
                rows={5}
                variant="outlined"
            />
             <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                size="large" 
                // onClick={submitForm}
            >
                Edit
            </Button>
            <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                size="large" 
                // onClick={submitForm}
            >
                Comments
            </Button>
        </Box>
        </div>
    </>
    )
}