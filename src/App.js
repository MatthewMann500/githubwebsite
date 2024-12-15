import background from './Images/WindowsXPBackground.jpg';
import './App.css';
import TaskBar from './components/Taskbar/Taskbar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={background} className="App-logo" alt="logo" />
        <TaskBar/>
      </header>
    </div>
  );
}

export default App;
