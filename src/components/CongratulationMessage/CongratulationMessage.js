import React from 'react';
import {makeStyles} from '@mui/styles';
import { Typography, Paper } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '&.MuiPaper-root': {
    backgroundColor: theme.palette.primary.darker, // Green color, you can change this to your preferred color
    color: 'white',
    },
  },
  heading: {
    fontSize: '1.5rem',
  },
  messageText: {
    fontSize: '1rem',
  },
}));

const CongratulationMessage = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.messageContainer} elevation={3}>
      <Typography variant="h4" className={classes.heading}>
        Congratulations!
      </Typography>
      <Typography variant='body1' className={classes.messageText}>
        Your meditation session has ended.
      </Typography>
      <Typography variant='body1' className={classes.messageText}>
        Check your progress in the app's progress section.
      </Typography>
    </Paper>
  );
};

export default CongratulationMessage;