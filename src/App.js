// src/App.js
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import FilterTasks from './components/FilterTasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? updatedTask : task));
  };

  const reorderTasks = (reorderedTasks) => {
    setTasks(reorderedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  }).sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Task Prioritization App</h1>
      <AddTask addTask={addTask} />
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <FilterTasks filter={filter} setFilter={setFilter} />
        <TaskList 
          tasks={filteredTasks} 
          deleteTask={deleteTask} 
          editTask={editTask} 
          reorderTasks={reorderTasks} 
        />
      </div>
    </div>
  );
};

export default App;