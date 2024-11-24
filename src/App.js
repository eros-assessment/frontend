import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskType, intensity, failPercentage) => {
    const newTask = {
      id: tasks.length + 1,
      type: taskType,
      status: 'pending',
      progress: 0,
      intensity: intensity,
      failPercentage: failPercentage,
    };

    setTasks([...tasks, newTask]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage addTask={addTask} />} />
      </Routes>
    </Router>
  );
}

export default App;