import React from 'react';
import './TaskBar.css';
import StartButton from '../Buttons/Start/StartButton';
import Pinned from '../Pinned/Pinned_Apps';
import mail from '../../Images/emblem-mail.png';
import explorer from '../../Images/emblem-web.png';
import paint from '../../Images/gnome-fs-desktop.png';
import player from '../../Images/emblem-videos.png';
import Tab from '../Buttons/Tabs/Tab';

const TaskBar = () => {
  return (
    <div className="taskbar">
      <div className="taskbar-section left">
        <StartButton />
        <Pinned imageUrl={explorer} altText="Explorer" />
        <Pinned imageUrl={mail} altText="Mail" />
        <Pinned imageUrl={paint} altText="Paint" />
        <Pinned imageUrl={player} altText="Player" />
        <div className="space-between"></div>
        <Tab imageUrl={explorer} altText="Explorer" text="Internet Explorer"/>
        <Tab imageUrl={mail} altText="Mail" text="Mail"/>
      </div>
      <div className="taskbar-section right">
        <div className="taskbar-item">12:45 PM</div>
      </div>
    </div>
  );
};

export default TaskBar;
