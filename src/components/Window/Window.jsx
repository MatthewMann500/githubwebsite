import React, { useState, useRef, useEffect } from "react";
import "./Window.css";

const XPWindow = ({
  title,
  children,
  onClose,
  onMinimize,
  minimized,
  onFocus,
  zIndex,
}) => {
  const windowRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [isResizing, setIsResizing] = useState(false);
  const [size, setSize] = useState({ width: 1200, height: 800 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });

  // New states for maximize feature
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevPosition, setPrevPosition] = useState(null);
  const [prevSize, setPrevSize] = useState(null);

  const handleMouseDown = (e) => {
    if (isMaximized) return;
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleResizeMouseDown = (e) => {
    if (isMaximized) return;
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({ x: e.clientX, y: e.clientY });
  };

  // Maximize toggle handler
  const handleMaximize = () => {
    if (!isMaximized) {
      setPrevPosition(position);
      setPrevSize(size);
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 35 });
      setIsMaximized(true);
    } else {
      if (prevPosition && prevSize) {
        setPosition(prevPosition);
        setSize(prevSize);
      }
      setIsMaximized(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && !isMaximized) {
        setPosition({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        });
      } else if (isResizing && !isMaximized) {
        setSize({
          width: Math.max(200, size.width + (e.clientX - resizeStart.x)),
          height: Math.max(150, size.height + (e.clientY - resizeStart.y)),
        });
        setResizeStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, offset, resizeStart, size, isMaximized]);

  return (
    <div
      ref={windowRef}
      className="xp-window"
      onMouseDown={onFocus}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        display: minimized ? "none" : "flex",
        zIndex: zIndex,
      }}
    >
      <div
        className="xp-window-titlebar"
        onMouseDown={(e) => {
          e.stopPropagation();
          onFocus();
          handleMouseDown(e);
        }}
      >
        <span className="xp-window-title">{title}</span>
        <div className="xp-window-buttons">
          <button className="xp-button" onClick={onMinimize}>
            _
          </button>{" "}
          <button className="xp-button" onClick={handleMaximize}>
            {isMaximized ? "❐" : "□"}
          </button>{" "}
          <button className="xp-button close" onClick={onClose}>
            ✕
          </button>{" "}
        </div>
      </div>
      <div className="xp-window-content">{children}</div>
      <div
        className="xp-resize-handle"
        onMouseDown={handleResizeMouseDown}
      ></div>
    </div>
  );
};

export default XPWindow;
