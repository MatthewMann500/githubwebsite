import background from './Images/WindowsXPBackground.jpg';
import React, { useState } from 'react';
import './App.css';
import TaskBar from './components/Taskbar/Taskbar';
import XPWindow from './components/Window/Window';
import Explorer from './components/Apps/Explorer'
function App() {
	const [windows, setWindows] = useState([]);
	
	const handleOpenWindow = (windowData) => {
		const newWindow = {
			id: Date.now(), 
			title: windowData.title,
			content: `This is window ${windows.length + 1}`,
            imageUrl: windowData.imageUrl,
		};
		setWindows(prev => [...prev, newWindow]);
  };
    const handleCloseWindow = (windowId) => {
        setWindows(prev => prev.filter(window => window.id !== windowId));
    }


  return (
    <div className="App">
      <header className="App-header">
        <img src={background} className="App-logo" alt="logo" />
        {windows.map(win => (
        <XPWindow key={win.id} title={win.title} onClose={() => handleCloseWindow(win.id)}>
            <Explorer/>
        </XPWindow>
      ))}
        <TaskBar onClick={handleOpenWindow} windows={windows}/>
      </header>
    </div>
  );
}

export default App;
