// src/components/Task.js
import React, { useState } from 'react';
import { Edit, Delete } from '@mui/icons-material';
import EditTask from './EditTask';

const Task = ({ task, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleComplete = () => {
    editTask(task.id, { ...task, completed: !task.completed });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50';
      case 'medium':
        return 'bg-yellow-50';
      case 'low':
        return 'bg-green-50';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md mb-4 ${getPriorityColor(task.priority)}`}>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">{task.title}</h2>
          <p className="text-gray-700">{task.description}</p>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleComplete}
            className="mr-2"
          />
          <button onClick={handleEdit} className="text-blue-500 hover:text-blue-700">
            <Edit />
          </button>
          <button onClick={handleDelete} className="text-red-500 hover:text-red-700 ml-2">
            <Delete />
          </button>
        </div>
      </div>
      {isEditing && (
        <EditTask 
          task={task} 
          editTask={editTask} 
          handleEdit={handleEdit} 
        />
      )}
    </div>
  );
};

export default Task;