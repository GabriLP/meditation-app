import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Container } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import AudioSelector from '../AudioSelector/AudioSelector';

const useStyles = makeStyles(() => ({
    customProgress: {
        width: '100%',
        borderRadius: '5px',
        '&.MuiLinearProgress-root': {
            height: '10px',
            margin: '1em 0',
        }
    },
    timerInfo: {
        paddingTop: '1em',
    },
}));

const TimerDisplay = ({ sessionDuration, currentTime, progress, 
    audioSources, selectedAudio, timerActive, setSelectedAudio, sourceLabelMapping}) => {
        const classes = useStyles();

        const formatTime = (timeInSeconds) => {
            const hours = Math.floor(timeInSeconds / 3600);
            const remainingMinutes = Math.floor((timeInSeconds % 3600) / 60);
            const seconds = timeInSeconds % 60;
          
            if (hours > 0) {
              return `${hours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            } else {
              return `${remainingMinutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            }
          };  

    return (
        <Container className={classes.timerDisplay}>
            <Typography variant='body1' className={classes.timerInfo}>
                Current Duration: {formatTime(sessionDuration)}
            </Typography>
            <Typography variant='body1' className={classes.timerInfo}>
                Time remaining: {formatTime(currentTime)}
            </Typography>
            <LinearProgress
                role='progressbar'
                aria-label='Aria Name'
                className={classes.customProgress}
                variant="determinate" 
                value={progress} 
                />
            <AudioSelector
                audioSources={audioSources}
                selectedAudio={selectedAudio}
                isTimerActive={timerActive}
                setSelectedAudio={setSelectedAudio}
                sourceLabelMapping={sourceLabelMapping}
                />
        </Container>
    );
};

export default TimerDisplay;