import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteAllTasks } from '../api/taskService';
import { FaTrash } from 'react-icons/fa';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };
    loadTasks();

    const intervalId = setInterval(() => {
      loadTasks();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const handleDeleteAll = async () => {
    await deleteAllTasks();
    setTasks([]);
  };

  return (
    <div className="task-cards-container">
      <button className="delete-all-button" onClick={handleDeleteAll}>
          <FaTrash className="delete-all-icon" /> Delete All Tasks
        </button>
      <div>Total tasks: {tasks.length}</div>
      <div className="task-cards">
        {tasks.map((task) => (
          <div key={task.id} className={`task-card ${task.status}`}>
            <div className="task-card-header">
              <h4>Task ID: {task.id}</h4>
            </div>
            <div className="task-card-body">
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Task Type:</strong> {task.type}</p>
              <p><strong>Fail Percentage:</strong> {task.failPercentage}%</p>
              <p><strong>Resource Intensive:</strong> {task.resourceIntensive}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
