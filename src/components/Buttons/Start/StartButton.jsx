import React from 'react';
import logo from '../../../Images/logo.png';
import './StartButton.css';

const StartButton = () => {
  return (
    <button className="start-button">
        <div className="microsoft-logo">
        <img src={logo} className="microsoft-logo" alt="logo"/>
        </div>
        <div className="start-label">
            <label>start</label>
        </div>
    </button>
  );
};

export default StartButton;