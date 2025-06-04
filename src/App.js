import background from "./Images/WindowsXPBackground.jpg";
import React, { useState } from "react";
import "./App.css";
import TaskBar from "./components/Taskbar/Taskbar";
import XPWindow from "./components/Window/Window";
import Explorer from "./components/Apps/Explorer";
import Mail from "./components/Apps/Mail/Mail";
import Paint from "./components/Apps/Paint/Paint";
import mail from "./Images/emblem-mail.png";
import explorer from "./Images/emblem-web.png";
import paint from "./Images/gnome-fs-desktop.png";
import player from "./Images/emblem-videos.png";

function App() {
  const [windows, setWindows] = useState([]);

  const desktopIcons = [
    { title: "Explorer", type: "explorer", imageUrl: explorer },
    { title: "Mail", type: "mail", imageUrl: mail },
    { title: "Paint", type: "paint", imageUrl: paint },
    { title: "Media Player", type: "audio", imageUrl: player },
  ];

  const handleOpenWindow = (windowData) => {
    setWindows((prev) => {
      const existing = prev.find(
        (w) => w.title === windowData.title && w.type === windowData.type
      );

      if (existing) {
        return prev.map((w) =>
          w.id === existing.id ? { ...w, minimized: false } : w
        );
      } else {
        const newWindow = {
          id: Date.now(),
          title: windowData.title,
          type: windowData.type,
          imageUrl: windowData.imageUrl,
          minimized: false,
        };
        return [...prev, newWindow];
      }
    });
  };

  const handleCloseWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const handleMinimizeWindow = (windowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, minimized: true } : w))
    );
  };

  const handleRestoreWindow = (windowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, minimized: false } : w))
    );
  };

  const handleFocusWindow = (windowId) => {
    setWindows((prev) => {
      const windowToFocus = prev.find((w) => w.id === windowId);
      if (!windowToFocus) return prev;

      const filtered = prev.filter((w) => w.id !== windowId);

      return [...filtered, windowToFocus];
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={background} className="App-logo" alt="logo" />

        <div className="desktop-icons">
          {desktopIcons.map((icon, i) => (
            <div
              key={i}
              className="desktop-icon"
              onDoubleClick={() => handleOpenWindow(icon)}
            >
              <img
                src={icon.imageUrl}
                alt={icon.title}
                className="icon-image"
              />
              <div className="icon-label">{icon.title}</div>
            </div>
          ))}
        </div>

        {windows.map((win, index) => (
          <XPWindow
            key={win.id}
            title={win.title}
            onClose={() => handleCloseWindow(win.id)}
            onMinimize={() => handleMinimizeWindow(win.id)}
            minimized={win.minimized}
            onFocus={() => handleFocusWindow(win.id)}
            zIndex={index + 100}
          >
            {win.type === "explorer" && <Explorer />}
            {win.type === "mail" && <Mail />}
            {win.type === "paint" && <Paint />}
          </XPWindow>
        ))}

        <TaskBar
          onClick={handleOpenWindow}
          windows={windows}
          onTabClick={(id) => {
            handleRestoreWindow(id);
            handleFocusWindow(id);
          }}
        />
      </header>
    </div>
  );
}

export default App;
