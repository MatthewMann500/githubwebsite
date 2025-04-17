import React from 'react';
import './Tab.css';

const Tab = ({ imageUrl, altText = 'Pinned Image', text, onTabClick }) => {
	const handleClick = () => {
    onTabClick({
      
    });
  };
  return (
    <div className="Tab-Container">
      <button className="Tab-Button">
        <img src={imageUrl} alt={altText} className="Tab-Image" />
        <label className='Tab-Text'>{text}</label>
      </button>
    </div>
  );
};

export default Tab;
