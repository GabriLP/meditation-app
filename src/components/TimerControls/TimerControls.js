import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
  timerControls: {
    margin: theme.spacing(1),
  },
  button: {
    '&.MuiButton-root': {
      margin: theme.spacing(1),
    },
  },
}));

const TimerControls = ({timerActive, startTimer, pauseTimer, resetTimer}) => {
        const classes = useStyles();

    return (
        <div className={classes.timerControls}>
        {!timerActive ? (
          <Button variant="contained" className={classes.button} onClick={startTimer}>
            Start
          </Button>
        ) : (
          <Button variant="contained" className={classes.button} onClick={pauseTimer}>
            Pause
          </Button>
        )}
        <Button variant="outlined" onClick={resetTimer} className={classes.button}>
          Reset
        </Button>
      </div>
  );
};


export default TimerControls;