import React from "react";
import "./Tab.css";

const Tab = ({ imageUrl, altText = "Pinned Image", text, onTabClick, id }) => {
  return (
    <div className="Tab-Container">
      <button className="Tab-Button" onClick={() => onTabClick(id)}>
        <img src={imageUrl} alt={altText} className="Tab-Image" />
        <label className="Tab-Text">{text}</label>
      </button>
    </div>
  );
};

export default Tab;
