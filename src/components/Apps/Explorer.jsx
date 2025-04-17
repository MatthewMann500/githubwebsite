import React from 'react';
import './Explorer.css' 
import { useState, useEffect, useRef } from 'react';
import MenuRow from './MenuRow';
const Explorer = () => {

    const [openMenu, setOpenMenu] = useState(null);
    const menuRef = useRef(null);

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
        </section>
        <section className='ie-address-bar'>
        </section>
        <div className='search-Engine'>

        </div>
        <footer className='ie-footer'>

        </footer>
        </div>


    );
}

export default Explorer;
