import React from "react"
import './Explorer.css'
import trevmattlogo from '../../Images/trevmattpng.png';

const SearchHome = ({ searchInput, setSearchInput, handleSearch }) => {

    return (
        <div className="explorer-container">
        <header className="explorer-header">
            <div>Gmail</div>
            <div>About</div>
        </header>
        <img className="trevmatt" src = {trevmattlogo} alt="Trevmatt Explorer"></img>
        <input className="search-bar"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <div className="explorer-buttons">
            <button id="enter" onClick={handleSearch}>Google Search</button>
            <button>I'm Feeling Lucky</button>
        </div>
        <footer className="footer-explorer">
        <div className="footer-right-items">
            <div>Privacy</div>
            <div>Terms</div>
            <div>Settings</div>
        </div>
        <div className="footer-left-items">
        <div>Cal Poly Pomona B.S.</div>
        </div>
        </footer>
        </div>
    );
};
export default SearchHome


