import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSessionContext } from '../SessionContext/SessionContext';
import CongratulationMessage from '../CongratulationMessage/CongratulationMessage';
import TimerSettings from '../TimerSettings/TimerSettings';
import TimerDisplay from '../TimerDisplay/TimerDisplay';
import TimerControls from '../TimerControls/TimerControls';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/system';
import { Paper, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  medContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2) , 
    margin: theme.spacing(4),
  },
}));

const MeditationTimer = () => {
const classes = useStyles();
const { storeSessionData } = useSessionContext();

const sourceLabelMapping = useMemo(() => ({
  [`${process.env.PUBLIC_URL}/audio/morning.mp3`]: 'Morning Sound',
  [`${process.env.PUBLIC_URL}/audio/rain.mp3`]: 'Rain Sound',
}), []);

const initialDuration = 600;
const initialSelectedAudio = localStorage.getItem('selectedAudio') 
|| Object.keys(sourceLabelMapping)[0];


const [timerActive, setTimerActive] = useState(false);
const [sessionDuration, setSessionDuration] = useState(initialDuration);
const [currentTime, setCurrentTime] = useState(initialDuration);
const [timerFinished, setTimerFinished] = useState(false);


const audioSources = useMemo(() => Object.keys(sourceLabelMapping), [sourceLabelMapping]);
const [selectedAudio, setSelectedAudio] = useState(initialSelectedAudio);

  const [showCongratulation, setShowCongratulation] = useState(false);

  const progress = (currentTime / sessionDuration) * 100;

  const handleTimer = useCallback(() => {
    if (timerActive && currentTime > 0) {
      setCurrentTime((prevTime) => prevTime - 1);
    } else if (timerActive) {
      setTimerActive(false);
      setTimerFinished(true);

      const sessionData = {
        date: new Date().toLocaleString('en-US',  { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        duration: sessionDuration,
      };

      // Store session data in localStorage
      localStorage.setItem('sessionData', JSON.stringify(sessionData));

      // Pass session data to SessionContext
      storeSessionData(sessionData);

      setShowCongratulation(true);
    }
  }, [timerActive, currentTime, sessionDuration, storeSessionData]);

  useEffect(() => {
    // Check local storage for previously selected audio source
    const storedSelectedAudio = localStorage.getItem('selectedAudio');
  
    if (!selectedAudio && storedSelectedAudio && audioSources.includes(storedSelectedAudio)) {
      setSelectedAudio(storedSelectedAudio);
    }
  }, [audioSources, selectedAudio]);

  useEffect(() => {
    if (timerActive) {
      const intervalId = setInterval(handleTimer, 1000);

      // Clear the interval when the component unmounts or when timerActive is false
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [timerActive, handleTimer]);

  useEffect(() => {
    setTimerFinished(false);
    // Storing session data
    const sessionData = {
      date: new Date().toLocaleString('en-US',  { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      duration: sessionDuration,
    };
    localStorage.setItem('sessionData', JSON.stringify(sessionData));
  }, [sessionDuration]);

  useEffect(() => {
    // Retrieving session data
    const storedData = localStorage.getItem('sessionData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setSessionDuration(parsedData.duration);
      setCurrentTime(parsedData.duration);
    }
  }, []);

  const startTimer = () => {
    if (!timerFinished && currentTime > 0) {
      setTimerActive(true);
    }
  };

  const pauseTimer = () => {
    setTimerActive(false);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setCurrentTime(sessionDuration);
    setTimerFinished(false);
  };

  const handleMinutesChange = (e) => {
    let minutes = parseInt(e.target.value) || 0;
    if (minutes < 0) {
      minutes = 0;
    }
    let newDuration;
  
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      minutes = minutes % 60;
      newDuration = hours * 3600 + minutes * 60 + (sessionDuration % 60);
      e.target.value = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    } else {
      newDuration = minutes * 60 + (sessionDuration % 60);
      e.target.value = minutes;
    }
  
    setSessionDuration(newDuration);
    setCurrentTime(newDuration);
  };

  const handleSecondsChange = (e) => {
    let seconds = parseInt(e.target.value) || 0;
    if (seconds < 0) {
      seconds = 0;
    }
    const newDuration = (sessionDuration - (sessionDuration % 60)) + Math.min(seconds, 59); // Limit seconds to 59
    setSessionDuration(newDuration);
    setCurrentTime(newDuration);
    e.target.value = Math.min(seconds, 59); // Update the input field value with limited seconds
  };

  return (
    <Container>
      <Paper elevation={5}  className={classes.medContainer}>
        {showCongratulation && <CongratulationMessage />}

        <Typography variant='h2'>Meditation Timer</Typography>
        
        <TimerSettings
          sessionDuration={sessionDuration}
          handleMinutesChange={handleMinutesChange}
          handleSecondsChange={handleSecondsChange}
        />
        <TimerDisplay
          sessionDuration={sessionDuration}
          currentTime={currentTime}
          progress={progress}
          audioSources={audioSources}
          selectedAudio={selectedAudio}
          timerActive={timerActive}
          setSelectedAudio={setSelectedAudio}
          sourceLabelMapping={sourceLabelMapping}
        />
        <TimerControls
          timerActive={timerActive}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          resetTimer={resetTimer}
        />
      </Paper>
    </Container>
  );
};

export default MeditationTimer;