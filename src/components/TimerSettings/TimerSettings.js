import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    customGrid: {
      alignItems: 'center',
    },
    inputStyle: {
      width: '150px',
    },
    spanStyle: {
      alignItems: 'center',
      fontSize: '25px',
    },
    customLabel: {
      '&.MuiInputLabel-root': {
        color: 'gray',
      },
    },
}));

const TimerSettings = ({ sessionDuration, handleMinutesChange, handleSecondsChange }) => {
    const classes = useStyles();
    
  return (
    <div className="timer-settings">
        <Grid container spacing={2} className={classes.customGrid}>
        <Grid item>
            <TextField
            type="number"
            label="Minutes"
            value={Math.floor(sessionDuration / 60 || '')} // Display minutes
            onChange={handleMinutesChange}
            className={classes.inputStyle}
            InputLabelProps={{
                classes: {
                root: classes.customLabel, // Apply your custom label styles here
                },
            }}
            />
        </Grid>
        <Grid item>
            <span className={classes.spanStyle}>:</span>
        </Grid>
        <Grid item>
            <TextField
            type="number"
            label="Seconds"
            value={sessionDuration % 60 || ''} // Display seconds
            onChange={handleSecondsChange}
            className={classes.inputStyle}
            InputLabelProps={{
                classes: {
                root: classes.customLabel, // Apply your custom label styles here
                },
            }}
            />
        </Grid>
        </Grid>
    </div>
  );
};

export default TimerSettings;


