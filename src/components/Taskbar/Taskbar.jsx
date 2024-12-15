import React from 'react';
import './TaskBar.css';
import StartButton from '../Buttons/Start/StartButton';

const TaskBar = () => {
  return (
    <div className="taskbar">
      <div className="taskbar-section left">
        <StartButton />
      </div>
      <div className="taskbar-section center">
        <div className="taskbar-item">Open Apps</div>
      </div>
      <div className="taskbar-section right">
        <div className="taskbar-item">12:45 PM</div>
      </div>
    </div>
  );
};

export default TaskBar;
