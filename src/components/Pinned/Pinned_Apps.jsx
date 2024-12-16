import React from 'react';
import './Pinned_Apps.css';

const Pinned = ({ imageUrl, altText = 'Pinned Image' }) => {
  return (
    <div className="Pinned-Container">
      <button className="Pinned-Button">
        <img src={imageUrl} alt={altText} className="Pinned-Image" />
      </button>
    </div>
  );
};

export default Pinned;