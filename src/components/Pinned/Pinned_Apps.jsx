import React from 'react';
import './Pinned_Apps.css';

const Pinned = ({ imageUrl, altText, onPinnedClick }) => {
	const handleClick = () => {
    onPinnedClick({
      title: altText,
      imageUrl: imageUrl,
    });
  };
  return (
    <div className="Pinned-Container">
      <button className="Pinned-Button">
        <img src={imageUrl} alt={altText} className="Pinned-Image" onClick={handleClick}/>
      </button>
    </div>
  );
};

export default Pinned;
