import React from "react"
import './Explorer.css'
const MenuRow = ({content, shortcut}) => {

    return (
        <div class="menu-row">
            <div class="menu-check"></div>
            <div class="menu-option">{content}</div>
            <div class="menu-shortcut">{shortcut}</div>
            <div class="menu-arrow"></div>
        </div>
    );
};
export default MenuRow

