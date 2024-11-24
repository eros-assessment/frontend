import React, { useState } from 'react';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
const HomePage = () => {
    const [tasks, setTasks] = useState([]);

    const handleTaskCreated = (newTask) => {
        setTasks([...tasks, newTask]);
    };


    return (
        <div>
            <Header />
            <TaskForm onTaskCreated={handleTaskCreated} />
            <TaskList tasks={tasks} />
        </div>
    );
};

export default HomePage;