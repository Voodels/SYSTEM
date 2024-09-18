import React, { useState, useEffect } from 'react';
import ApiHandler from '../services/api';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    task: '',
    description: '',
    date: '',
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState({
    task: '',
    description: '',
    date: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await ApiHandler.tasks.getTasks();
        console.log("Fetched tasks:", tasks); // Log the tasks
        setTasks(tasks);
      } catch (err) {
        console.log("Error fetching tasks:", err);
      }
    };
    fetchData();
  }, []);

  const handleAddTask = async () => {
    if (!newTask.task) {
      alert("Task field cannot be empty!");
      return; // Prevent adding empty tasks
    }
  
    try {
      const addedTask = await ApiHandler.tasks.addTask(newTask);
      setTasks([...tasks, addedTask]);
      setNewTask({
        task: '',
        description: '',
        date: '',
      });
    } catch (err) {
      console.log("Error adding task:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await ApiHandler.tasks.deleteTask(id);
      const newTasks = tasks.filter((task) => task._id !== id);
      setTasks(newTasks);
    } catch (err) {
      console.log("Error deleting task:", err);
    }
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task._id);
    setEditingTask({
      task: task.task,
      description: task.description,
      date: task.date,
    });
  };

  const handleUpdateTask = async () => {
    try {
      const updatedTask = await ApiHandler.tasks.updateTask(editingTaskId, editingTask);
      setTasks(tasks.map(task => (task._id === editingTaskId ? updatedTask : task)));
      setEditingTaskId(null);
      setEditingTask({
        task: '',
        description: '',
        date: '',
      });
    } catch (err) {
      console.log("Error updating task:", err);
    }
  };

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li key={task._id}>
              <span>{task.task} - {task.description} ({task.date})</span>
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
              <button onClick={() => handleEditTask(task)}>Edit</button>
            </li>
          ))
        ) : (
          <li>No tasks available</li> // Show a message if there are no tasks
        )}
      </ul>
      
      <h2>Add New Task</h2>
      <input
        type="text"
        value={newTask.task}
        onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
        placeholder="Task"
      />
      <input
        type="text"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        placeholder="Description"
      />
      <input
        type="date"
        value={newTask.date}
        onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
      />
      <button onClick={handleAddTask}>Add Task</button>

      {editingTaskId && (
        <div>
          <h2>Edit Task</h2>
          <input
            type="text"
            value={editingTask.task}
            onChange={(e) => setEditingTask({ ...editingTask, task: e.target.value })}
            placeholder="Task"
          />
          <input
            type="text"
            value={editingTask.description}
            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
            placeholder="Description"
          />
          <input
            type="date"
            value={editingTask.date}
            onChange={(e) => setEditingTask({ ...editingTask, date: e.target.value })}
          />
          <button onClick={handleUpdateTask}>Update Task</button>
        </div>
      )}
    </div>
  );
};

export default Tasks;
