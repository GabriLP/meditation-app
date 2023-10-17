import React from 'react';
import { useSessionContext } from '../SessionContext/SessionContext';
import { makeStyles } from '@mui/styles';
import { Paper, Typography, Container } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  progressTracker: {
    margin: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: '#2196F3', // Blue color, change this to your preferred color
    color: 'white',
  },
  sessionList: {
    display: 'flex',
    flexDirection: 'column',
  },
  session: {
    backgroundColor: 'white',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
}));

const ProgressTracker = () => {
  const classes = useStyles();
  const { sessionData } = useSessionContext();

  return (
    <Paper className={classes.progressTracker} elevation={3}>
      <Typography variant="h4">Meditation Progress Tracker</Typography>
      {sessionData.length === 0 ? (
        <Typography>No meditation sessions recorded yet.</Typography>
      ) : (
        <div className={classes.sessionList}>
          {sessionData.map((session, index) => (
            <Container key={index} className={classes.session}>
              <Typography>Date: {session.date}</Typography>
              <Typography>Duration: {session.duration} seconds</Typography>
              {/* Add more session details here */}
            </Container>
          ))}
        </div>
      )}
    </Paper>
  );
};

export default ProgressTracker;