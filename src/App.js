import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import theme from './theme';

// Import components
import OnboardingPage from './components/Onboarding/OnboardingPage';
import MeditationTimer from './components/MeditationTimer/MeditationTimer.js';
import ProgressTracker from './components/ProgressTracker/ProgressTracker';
import { SessionProvider } from './components/SessionContext/SessionContext';


function App() {

  return (
    <ThemeProvider theme={theme}>
    <SessionProvider>
      <Router basename='/meditation-app'>
        <div className='root'>
          <Navbar />

          <Routes>
            {/* Define your routes here */}
            <Route path="/" exact element={<OnboardingPage/>} />
            <Route path="/timer" element={<MeditationTimer/>} />
            <Route path="/progress" element={<ProgressTracker/>} />
            {/* Add more routes for other features as needed */}

            {/* Redirect to the onboarding page if the route doesn't match */}
            <Route path="*" element={<Navigate to="/meditation-app" />} />
          </Routes>
        </div>
      </Router>
    </SessionProvider>
    </ThemeProvider>
  );
}

export default App;
