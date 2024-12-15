import React from 'react';
import logo from '../../../Images/logo.png';
import './StartButton.css';

const StartButton = () => {
  return (
    <button class="start-button">
        <img src={logo} class="microsoft-logo" alt="logo"/>
        <label>start</label>
    </button>
  );
};

export default StartButton;