import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteTask, deleteAllTasks } from '../api/taskService';
import { FaTrash, FaTrashAlt } from 'react-icons/fa';

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
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleDeleteAll = async () => {
    await deleteAllTasks();
    setTasks([]);
  };

  return (
    <div className="task-cards-container">
      <button className="delete-all-button" onClick={handleDeleteAll}>
          <FaTrash className="delete-all-icon" /> Delete All Tasks
        </button>
      <div className="task-cards">
        {tasks.map((task) => (
          <div key={task.id} className={`task-card ${task.status}`}>
            <div className="task-card-header">
              <h4>Task ID: {task.id}</h4>
            </div>
            <div className="task-card-body">
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Attempts:</strong> {task.attempts}</p>
              <p><strong>Task Type:</strong> {task.type}</p>
              <p><strong>Fail Percentage:</strong> {task.failPercentage}%</p>
              <p><strong>Resource Intensive:</strong> {task.resourceIntensive}</p>
              <button className="delete-button" onClick={() => handleDelete(task.id)}>
                <FaTrashAlt className="delete-icon" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
