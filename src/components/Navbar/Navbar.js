import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    display: 'flex',
    flexDirection: 'column', // Stack children vertically
    alignItems: 'center',
  },
  title: {
    display: 'flex',
    minHeight: '82px',
    alignItems: 'center',
  },
  logo: {
    width: '50px', // Adjust the width as needed
    marginRight: theme.spacing(1), // Add spacing between the logo and the text
  },
  link: {
    margin: `0 ${theme.spacing(1)}`,
    textDecoration: 'none',
    color: '#fff',
    position: 'relative',

    '&::before': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '3px',
      bottom: '0',
      left: '0',
      backgroundColor: '#132a3a',
      visibility: 'hidden',
      transform: 'scaleX(0)',
      transition: 'all 0.3s ease-in-out',
    },

    '&:hover': {
      '&::before': {
        visibility: 'visible',
        transform: 'scaleX(1)',
      },
    },
  },
  toolbar: {
    justifyContent: 'space-around', // Space between the two divs
},
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Link to="/" className={classes.link}>
          <div className={classes.titleContainer}>
            <img src="/images/lotus.png" alt="A lotus, the main app logo" className={classes.logo} />
            <Typography 
              variant="h6">
                restful mindspace
            </Typography>
          </div>
        </Link>
        <Link to="/timer" className={classes.link}>
          <Typography variant="h6" className={classes.title}>
            Timer
          </Typography>
        </Link>
        <Link to="/progress" className={classes.link}>
          <Typography variant="h6" className={classes.title}>
            Progress
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;