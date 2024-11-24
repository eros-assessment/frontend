import React, { useState } from 'react';
import { createTask } from '../api/taskService';

const TaskForm = ({ onTaskCreated }) => {
  const [taskType, setTaskType] = useState("light");
  const [taskCount, setTaskCount] = useState(1);
  const [failPercentage, setFailPercentage] = useState(0);
  const [intensity, setIntensity] = useState("cpu");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      type: taskType,
      numberOfTasks: taskCount,
      failPercentage: failPercentage,
      resourceIntensive: intensity,
    };

    const finalTasks = [];
    for (let i = 0; i < newTask.numberOfTasks; i++) {
      finalTasks.push({ type: newTask.type, resourceIntensive: newTask.resourceIntensive, failPercentage: newTask.failPercentage })
    }
    const createdTask = await createTask(finalTasks);
    onTaskCreated(createdTask);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>Create Tasks</h2>
      <div className="form-row">
        {/* Task Type */}
        <div className="form-group">
          <label><strong>Task Type</strong></label>
          <div className="radio-buttons">
            <label>
              <input
                type="radio"
                name="taskType"
                value="light"
                checked={taskType === 'light'}
                onChange={(e) => setTaskType(e.target.value)}
              />
              Light
            </label>
            <label>
              <input
                type="radio"
                name="taskType"
                value="average"
                checked={taskType === 'average'}
                onChange={(e) => setTaskType(e.target.value)}
              />
              Average
            </label>
            <label>
              <input
                type="radio"
                name="taskType"
                value="intense"
                checked={taskType === 'intense'}
                onChange={(e) => setTaskType(e.target.value)}
              />
              Intense
            </label>
          </div>
        </div>

        {/* Number of Tasks */}
        <div className="form-group">
          <label><strong>Number of Tasks</strong></label>
          <input
            type="number"
            value={taskCount}
            onChange={(e) => setTaskCount(e.target.value)}
            min="1"
            className="input-field"
          />
        </div>

        {/* Fail Percentage */}
        <div className="form-group">
          <label><strong>Fail Percentage (%)</strong></label>
          <input
            type="number"
            value={failPercentage}
            onChange={(e) => setFailPercentage(e.target.value)}
            min="0"
            max="100"
            className="input-field"
          />
        </div>

        {/* Task Intensity */}
        <div className="form-group">
          <label><strong>Task Intensity</strong></label>
          <div className="radio-buttons">
            <label>
              <input
                type="radio"
                name="intensity"
                value="cpu"
                checked={intensity === 'cpu'}
                onChange={(e) => setIntensity(e.target.value)}
              />
              CPU Intensive
            </label>
            <label>
              <input
                type="radio"
                name="intensity"
                value="ram"
                checked={intensity === 'ram'}
                onChange={(e) => setIntensity(e.target.value)}
              />
              RAM Intensive
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Submit Tasks</button>
      </div>
    </form>
  );
};

export default TaskForm;