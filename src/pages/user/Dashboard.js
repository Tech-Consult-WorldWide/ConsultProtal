import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  // State for dynamic task management
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  // State for simulating data metrics
  const [dataMetrics] = useState({
    users: 120,
    sales: 450,
    growth: "15%",
  });

  // Handle adding a new task
  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  };

  // Handle removing a task
  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard. Here you can manage your activities.</p>

      {/* Metric Cards */}
      <div className="dashboard-metrics">
        <div className="metric-card">
          <h3>Total Users</h3>
          <p>{dataMetrics.users}</p>
        </div>
        <div className="metric-card">
          <h3>Sales</h3>
          <p>${dataMetrics.sales}</p>
        </div>
        <div className="metric-card">
          <h3>Growth</h3>
          <p>{dataMetrics.growth}</p>
        </div>
      </div>

      {/* Task Manager */}
      <div className="task-manager">
        <h3>Task Manager</h3>
        <div className="task-input">
          <input
            type="text"
            placeholder="Enter a new task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => removeTask(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Placeholder for Chart */}
      <div className="dashboard-chart">
        <h3>Performance Overview</h3>
        <p>Placeholder for charts (e.g., Bar Chart or Pie Chart)</p>
      </div>
    </div>
  );
}

export default Dashboard;
