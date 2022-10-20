import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppWrapper from './AppWrapper';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </div>
  );
}

export default App;
