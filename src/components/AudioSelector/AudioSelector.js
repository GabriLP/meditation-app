import React, { useState, useEffect, useRef } from 'react';
import { Typography, Select, MenuItem, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  audioContainer: {
    '&.MuiContainer-root': {
      padding: '0',
    },
  },
  audioPlayer: {
    display: 'flex',
    margin: '1em 0',
    border: '1px solid #ccc',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
  },
}));

const AudioSelector = ({ audioSources, isTimerActive }) => {
  const classes = useStyles();
  const [selectedAudio, setSelectedAudio] = useState(
    localStorage.getItem('selectedAudio') || audioSources[0]
  );
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to indicate loading
  const audioRef = useRef(null);

  const sourceLabelMapping = {
    [process.env.PUBLIC_URL + '/audio/morning.mp3']: 'Morning Sound',
    [process.env.PUBLIC_URL + '/audio/rain.mp3']: 'Rain Sound',
  };

  useEffect(() => {
    // Check local storage for previously selected audio source
    const storedSelectedAudio = localStorage.getItem('selectedAudio');
    if (storedSelectedAudio && audioSources.includes(storedSelectedAudio)) {
      setSelectedAudio(storedSelectedAudio);
    }

    // Load the audio source when the component mounts
    audioRef.current.src = selectedAudio;
    audioRef.current.load();
    audioRef.current.addEventListener('loadeddata', () => {
      setIsLoading(false); // Set isLoading to false when audio is loaded
    });
  }, [audioSources, selectedAudio]);

  useEffect(() => {
    if (isTimerActive) {
      if (!isLoading) {
        audioRef.current.play().catch((error) => {
          console.error('Failed to play audio:', error);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isTimerActive, isLoading]);

  const handleAudioChange = (e) => {
    const selectedSource = e.target.value;
    setSelectedAudio(selectedSource);
    localStorage.setItem('selectedAudio', selectedSource);

    setIsLoading(true);
    audioRef.current.pause();

    audioRef.current.src = selectedSource;
    audioRef.current.load();
    
    // Play the audio and handle errors
    audioRef.current.play()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to play audio:', error);
        setIsLoading(false);
      });
  };

  return (
    <Container className={classes.audioContainer}>
        <Typography variant="h6">Choose Audio Source</Typography>
        <Select value={selectedAudio} onChange={handleAudioChange}>
          {audioSources.map((source, index) => (
            <MenuItem key={index} value={source}>
              {sourceLabelMapping[source]}
              </MenuItem>
          ))}
        </Select>
        <audio ref={audioRef} controls loop className={classes.audioPlayer} />
    </Container>
  );
};

export default AudioSelector;