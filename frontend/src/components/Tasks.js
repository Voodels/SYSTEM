import React, { useState, useEffect } from 'react';
import ApiHandler from '../services/api';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({ task: '', description: '', date: '' });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState({ task: '', description: '', date: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await ApiHandler.tasks.getTasks();
        setTasks(tasks);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddTask = async () => {
    if (!newTask.task) {
      alert("Task field cannot be empty!");
      return;
    }
  
    try {
      const addedTask = await ApiHandler.tasks.addTask(newTask);
      setTasks([...tasks, addedTask]);
      setNewTask({ task: '', description: '', date: '' });
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await ApiHandler.tasks.deleteTask(id);
      const newTasks = tasks.filter((task) => task._id !== id);
      setTasks(newTasks);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task._id);
    setEditingTask({ task: task.task, description: task.description, date: task.date });
  };

  const handleUpdateTask = async () => {
    try {
      const updatedTask = await ApiHandler.tasks.updateTask(editingTaskId, editingTask);
      setTasks(tasks.map(task => (task._id === editingTaskId ? updatedTask : task)));
      setEditingTaskId(null);
      setEditingTask({ task: '', description: '', date: '' });
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <ul className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <li key={task._id} className="bg-gray-100 p-4 rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{task.task}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="text-sm text-gray-500">{task.date}</p>
                  </div>
                  <div>
                    <button onClick={() => handleEditTask(task)} className="text-blue-500 mr-2">Edit</button>
                    <button onClick={() => handleDeleteTask(task._id)} className="text-red-500">Delete</button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500">No tasks available</li>
          )}
        </ul>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Add New Task</h2>
        <div className="space-y-2">
          <input
            type="text"
            value={newTask.task}
            onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
            placeholder="Task"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <button onClick={handleAddTask} className="w-full bg-blue-500 text-white p-2 rounded">Add Task</button>
        </div>
      </div>

      {editingTaskId && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Edit Task</h2>
          <div className="space-y-2">
            <input
              type="text"
              value={editingTask.task}
              onChange={(e) => setEditingTask({ ...editingTask, task: e.target.value })}
              placeholder="Task"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={editingTask.description}
              onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
              placeholder="Description"
              className="w-full p-2 border rounded"
            />
            <input
              type="date"
              value={editingTask.date}
              onChange={(e) => setEditingTask({ ...editingTask, date: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button onClick={handleUpdateTask} className="w-full bg-green-500 text-white p-2 rounded">Update Task</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;