import React from 'react';
import './TaskBar.css';
import StartButton from '../Buttons/Start/StartButton';
import Pinned from '../Pinned/Pinned_Apps';
import mail from '../../Images/emblem-mail.png';
import explorer from '../../Images/emblem-web.png';
import paint from '../../Images/gnome-fs-desktop.png';
import player from '../../Images/emblem-videos.png';
import Tab from '../Buttons/Tabs/Tab';
const TaskBar = ({ windows, onClick }) => {

    const onPinnedClick = (pinnedData) => {      
        onClick({
            title: pinnedData.title,
            imageUrl: pinnedData.imageUrl,
            type: pinnedData.type,
        }); 
    }

  return (
    <div className="taskbar">
      <div className="taskbar-section left">
        <StartButton />
        <Pinned imageUrl={explorer} altText="Explorer" type="explorer" onPinnedClick={onPinnedClick}/>
        <Pinned imageUrl={mail} altText="Mail" type="mail" onPinnedClick={onPinnedClick}/>
        <Pinned imageUrl={paint} altText="Paint" type="paint" onPinnedClick={onPinnedClick}/>
        <Pinned imageUrl={player} altText="Player" type="audio" onPinnedClick={onPinnedClick}/>
        <div className="space-between"></div>    
        {windows.map(tab => (
            <Tab key={tab.id} imageUrl={tab.imageUrl} altText={tab.title} text={tab.title} /> 
        ))}
      </div>
      <div className="taskbar-section right">
        <div className="taskbar-item">12:45 PM</div>
      </div>
    </div>
  );
};

export default TaskBar;
