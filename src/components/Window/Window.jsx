import React, { useState, useRef, useEffect } from 'react';
import './Window.css';

const XPWindow = ({ title, children, onClose }) => {

	const windowRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);
	const [position, setPosition] = useState({ x: 50, y: 50 });
	const [offset, setOffset] = useState({ x: 0, y: 0 });

	const [isResizing, setIsResizing] = useState(false);
	const [size, setSize] = useState({ width: 300, height: 200 });
	const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });

	const handleMouseDown = (e) => {
		setIsDragging(true);
		setOffset({
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		});
	};

	const handleResizeMouseDown = (e) => {
		e.stopPropagation();
		setIsResizing(true);
		setResizeStart({ x: e.clientX, y: e.clientY });
	};

	useEffect(() => {
		const handleMouseMove = (e) => {
			if (isDragging) {
				setPosition({
					x: e.clientX - offset.x,
					y: e.clientY - offset.y,
				});
			} else if (isResizing) {
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
		if(isDragging || isResizing) {
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		}
		return() => {	
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isDragging, isResizing, offset, resizeStart]);

	return (
		<div
		ref={windowRef}
		className="xp-window"
		style={{
			top: `${position.y}px`,
				left: `${position.x}px`,
				width: `${size.width}px`,
				height: `${size.height}px`,
		}}
		>
		<div className="xp-window-titlebar" onMouseDown={handleMouseDown}>
		<span className="xp-window-title">{title}</span>
		<div className="xp-window-buttons">
		<button className="xp-button">_</button> {/* Minimize button */}
		<button className="xp-button">□</button> {/* Maximize button */}
		<button className="xp-button" onClick={onClose}>✕</button> {/* Close button */}
		</div>
		</div>
		<div className="xp-window-content">
		{children}
		</div>
		<div className="xp-resize-handle" onMouseDown={handleResizeMouseDown}></div>
		</div>
	);
};

export default XPWindow;
