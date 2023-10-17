import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNextRounded';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
  },
  header: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.secondary,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
  illustration: {
    display: 'block',
    margin: '0 auto',
    padding: theme.spacing(2),
    maxWidth: '70%',
  },
  buttonWrap: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  nextWrapper: {
    '&.MuiContainer-root': {
    display: 'flex',
    maxWidth: '90%',
    justifyContent: 'flex-end',
    },
  },
}));

const OnboardingPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleStartApp = () => {
    navigate('/timer');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <Container className={classes.header}>
            <Typography variant="h1">Welcome to restful mindspace</Typography>
            <Typography variant="body1">
              Discover inner peace and mindfulness with our guided meditation sessions.
            </Typography>
            <img
              src={process.env.PUBLIC_URL + '/images/meditation.png'}
              alt="Illustration"
              className={classes.illustration}
            />
          </Container>
        );
      case 2:
        return (
          <Container className={classes.header}>
            <Typography variant="h2">Explore Meditation</Typography>
            <Typography variant="body1">
              Discover a variety of meditation techniques and sessions.
            </Typography>
            <img
              src={process.env.PUBLIC_URL + '/images/peace.png'}
              alt="Illustration"
              className={classes.illustration}
            />
            <div className={classes.buttonWrap}>
            <Button
              variant="contained"
              className={classes.button}
              color="primary"
              onClick={handleStartApp}
              style={{ borderRadius: '50px' }} // Button styling
            >
              Start Meditating
            </Button>
          </div>
          </Container>
        );
      default:
        return null;
    }
  };

  return (
    <Container className={classes.container}>
      {renderContent()}
      <Container className={classes.navigation}>
        {currentPage > 1 && (
          <Container className={classes.prevWrapper}>
            <Button
              className={classes.prevButton}
              variant="outlined"
              size="large"
              onClick={handlePrevious}
            >
              Previous
          </Button>
          </Container>
        )}
        {currentPage < 2 && (
          <Container className={classes.nextWrapper}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={handleNext}
            >
              Next
              <NavigateNextIcon />
            </Button>
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default OnboardingPage;