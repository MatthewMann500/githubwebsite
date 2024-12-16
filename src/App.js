import background from './Images/WindowsXPBackground.jpg';
import './App.css';
import TaskBar from './components/Taskbar/Taskbar';
import XPWindow from './components/Window/Window';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={background} className="App-logo" alt="logo" />
        <XPWindow title="testing">
          <p>Testing</p>
        </XPWindow>
        <TaskBar/>
      </header>
    </div>
  );
}

export default App;
