import { useState, useEffect, useRef } from "react";
import MenuRow from "../MenuRow";
import "./Paint.css";
import Canvas from "./Canvas";
const Paint = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);

  const [tool, setTool] = useState("brush");
  const [brushSize, setBrushSize] = useState(4);
  const [brushColor, setBrushColor] = useState("#000000");

  return (
    <div className="paint-container">
      <section className="paint-toolbar" ref={menuRef}>
        <div
          className="paint-option"
          onClick={() => setOpenMenu(openMenu === "File" ? null : "File")}
          onMouseEnter={() => {
            if (openMenu) setOpenMenu("File");
          }}
        >
          File
          {openMenu === "File" && (
            <div class="dropdown">
              <MenuRow content="New" shortcut="" />
              <MenuRow content="Open..." shortcut="Ctrl+O" />
              <MenuRow content="Edit" shortcut="" />
              <MenuRow content="Save" shortcut="Ctrl+S" />
              <MenuRow content="Save As..." shortcut="" />
            </div>
          )}
        </div>
        <div
          className="paint-option"
          onClick={() => setOpenMenu(openMenu === "Edit" ? null : "Edit")}
          onMouseEnter={() => {
            if (openMenu) setOpenMenu("Edit");
          }}
        >
          Edit
          {openMenu === "Edit" && (
            <div class="dropdown">
              <div class="menu-option">New</div>
              <div class="menu-option">Open</div>
              <div class="menu-option">Save</div>
            </div>
          )}
        </div>
        <div
          className="paint-option"
          onClick={() => setOpenMenu(openMenu === "View" ? null : "View")}
          onMouseEnter={() => {
            if (openMenu) setOpenMenu("View");
          }}
        >
          View
          {openMenu === "View" && (
            <div class="dropdown">
              <div class="menu-option">New</div>
              <div class="menu-option">Open</div>
              <div class="menu-option">Save</div>
            </div>
          )}
        </div>
        <div
          className="paint-option"
          onClick={() =>
            setOpenMenu(openMenu === "Favorites" ? null : "Favorites")
          }
          onMouseEnter={() => {
            if (openMenu) setOpenMenu("Favorites");
          }}
        >
          Favorites
          {openMenu === "Favorites" && (
            <div class="dropdown">
              <div class="menu-option">New</div>
              <div class="menu-option">Open</div>
              <div class="menu-option">Save</div>
            </div>
          )}
        </div>
        <div
          className="paint-option"
          onClick={() => setOpenMenu(openMenu === "Tools" ? null : "Tools")}
          onMouseEnter={() => {
            if (openMenu) setOpenMenu("Tools");
          }}
        >
          Tools
          {openMenu === "Tools" && (
            <div class="dropdown">
              <div class="menu-option">New</div>
              <div class="menu-option">Open</div>
              <div class="menu-option">Save</div>
            </div>
          )}
        </div>
        <div
          className="paint-option"
          onClick={() => setOpenMenu(openMenu === "Help" ? null : "Help")}
          onMouseEnter={() => {
            if (openMenu) setOpenMenu("Help");
          }}
        >
          Help
          {openMenu === "Help" && (
            <div class="dropdown">
              <div class="menu-option">New</div>
              <div class="menu-option">Open</div>
              <div class="menu-option">Save</div>
            </div>
          )}
        </div>
      </section>

      <div className="paint-main">
        <aside className="paint-sidebar">
          <button onClick={() => setTool("brush")}>Brush</button>
          <button onClick={() => setTool("erase")}>Eraser</button>
          <button onClick={() => setBrushSize(2)}>Thin</button>
          <button onClick={() => setBrushSize(10)}>Thick</button>
        </aside>
        <main className="paint-canvas">
          <Canvas tool={tool} brushColor={brushColor} brushSize={brushSize} />
        </main>
      </div>

      <footer className="paint-footer">
        {["#000000", "#ff0000", "#00ff00", "#0000ff", "#ffff00"].map(
          (color) => (
            <button
              key={color}
              onClick={() => setBrushColor(color)}
              style={{
                backgroundColor: color,
                width: 24,
                height: 24,
                margin: 4,
                border: color === "#ffffff" ? "1px solid #ccc" : "none",
              }}
            />
          )
        )}
      </footer>
    </div>
  );
};

export default Paint;
