import React from 'react';
import './Explorer.css' 
import { useState, useEffect, useRef } from 'react';
import MenuRow from './MenuRow';
import axios from 'axios';
import SearchHome from './SearchHome';
import SearchResults from './SearchResults';
const Explorer = () => {

    const [openMenu, setOpenMenu] = useState(null);
    const menuRef = useRef(null);
    const [currentScreen, setCurrentScreen] = useState('home');
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [website, setWebsite] = useState('');

    const handleSearch = async () => {
        const options = {
      method: 'GET',
      url: 'https://real-time-web-search.p.rapidapi.com/search',
      params: {
        q: searchInput,
        limit: '10'
      },
      headers: {
        'x-rapidapi-key': 'b37719f4afmshb9ab4b56c86c077p150f84jsn9adfd48e399c',
        'x-rapidapi-host': 'real-time-web-search.p.rapidapi.com',
      }      
    };

    try {
      const response = await axios.request(options);
      setSearchResults(response.data.data);
        setCurrentScreen('results');
    } catch (error) {
      console.error(error);
        console.log(options);
    }
    };
    useEffect(() => {
        function handleClickOutside(event) {
            const clickedInside = menuRef.current && menuRef.current.contains(event.target);
            const clickedMenuItem = event.target.closest('.menu-item');

            if (!clickedInside || !clickedMenuItem) {
                setOpenMenu(null);
            }
        }
        function handleClickInside(event) {
            if (menuRef.current && !event.target.closest('.menu-item')) {
                setOpenMenu(null);
            }
        }

        document.addEventListener('mousedown', handleClickInside);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('mousedown', handleClickInside);
        };
    }, []);
    return (

        <div className='ie'>
        <section className="ie-toolbar" ref={menuRef}>
        <div className="ie-option" 
        onClick={() => setOpenMenu(openMenu === "File" ? null : "File")}
        onMouseEnter={() => {
            if (openMenu) setOpenMenu("File");
        }}>File
        {openMenu === "File" && (
        <div class="dropdown">
            <MenuRow content="New" shortcut=""/>
            <MenuRow content="Open..." shortcut="Ctrl+O"/>
            <MenuRow content="Edit" shortcut=""/>
            <MenuRow content="Save" shortcut="Ctrl+S"/>
            <MenuRow content="Save As..." shortcut=""/>
        </div>
        )}
        </div>
        <div className="ie-option" 
        onClick={() => setOpenMenu(openMenu === "Edit" ? null : "Edit")}
        onMouseEnter={() => {
            if (openMenu) setOpenMenu("Edit");
        }}>Edit
        {openMenu === "Edit" && (
        <div class="dropdown">
        <div class="menu-option">New</div>
        <div class="menu-option">Open</div>
        <div class="menu-option">Save</div>
        </div>
        )}
        </div>
        <div className="ie-option" 
        onClick={() => setOpenMenu(openMenu === "View" ? null : "View")}
        onMouseEnter={() => {
            if (openMenu) setOpenMenu("View");
        }}>View
        {openMenu === "View" && (
        <div class="dropdown">
        <div class="menu-option">New</div>
        <div class="menu-option">Open</div>
        <div class="menu-option">Save</div>
        </div>
        )}
        </div>
        <div className="ie-option" 
        onClick={() => setOpenMenu(openMenu === "Favorites" ? null : "Favorites")}
        onMouseEnter={() => {
            if (openMenu) setOpenMenu("Favorites");
        }}>Favorites
        {openMenu === "Favorites" && (
        <div class="dropdown">
        <div class="menu-option">New</div>
        <div class="menu-option">Open</div>
        <div class="menu-option">Save</div>
        </div>
        )}
        </div>
        <div className="ie-option" 
        onClick={() => setOpenMenu(openMenu === "Tools" ? null : "Tools")}
        onMouseEnter={() => {
            if (openMenu) setOpenMenu("Tools");
        }}>Tools
        {openMenu === "Tools" && (
        <div class="dropdown">
        <div class="menu-option">New</div>
        <div class="menu-option">Open</div>
        <div class="menu-option">Save</div>
        </div>
        )}
        </div>
        <div className="ie-option" 
        onClick={() => setOpenMenu(openMenu === "Help" ? null : "Help")}
        onMouseEnter={() => {
            if (openMenu) setOpenMenu("Help");
        }}>Help
        {openMenu === "Help" && (
            <div class="dropdown">
            <div class="menu-option">New</div>
            <div class="menu-option">Open</div>
            <div class="menu-option">Save</div>
            </div>
        )}
        </div>
        </section>
        <section className='ie-function-bar'>
        {currentScreen !== 'home' && (
            <button onClick={() => setCurrentScreen('home')}>Back to Search</button>
        )}
        </section>
        <section className='ie-address-bar'>
        </section>
        <div className='search-Engine'>
        {currentScreen === 'home' && (
            <SearchHome
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            handleSearch={handleSearch}
            />
        )}

        {currentScreen === 'results' && (
            <SearchResults
            results={searchResults}
            onResultClick={(url) => {
                setWebsite(url);
                setCurrentScreen('website');
            }}
            />
        )}

        {currentScreen === 'website' && (
            <iframe className="search-Engine" src={website} title="Website Viewer" style={{ width: "100%", height: "98%", border: "none"}}/>
        )}
        </div>
        <footer className='ie-footer'>

        </footer>
        </div>


    );
}

export default Explorer;
