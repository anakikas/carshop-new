import React from 'react';
import './App.css';
import Carlist from './components/Carlist';
import { AppBar, Toolbar, Typography } from '@mui/material';

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            CarShop
          </Typography>
        </Toolbar>
      </AppBar>

      <Carlist />
    </div>
  );
}

export default App;
