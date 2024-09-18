import React, { useState, useEffect } from 'react';
import ApiHandler from '../services/api';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';

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
        console.log("Fetched tasks:", tasks);
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
      return;
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Tasks</h1>

      {/* Tasks List */}
      <ul className="space-y-2">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li key={task._id} className="p-4 bg-gray-100 rounded-lg shadow">
              <span>{task.task} - {task.description} ({task.date})</span>

              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Content side="top" className="bg-black text-white p-1 rounded">
                    Delete this task
                  </Tooltip.Content>
                </Tooltip.Root>

                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      onClick={() => handleEditTask(task)}
                      className="ml-4 text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Content side="top" className="bg-black text-white p-1 rounded">
                    Edit this task
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
            </li>
          ))
        ) : (
          <li>No tasks available</li>
        )}
      </ul>

      {/* Add New Task */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Add New Task</h2>
      <div className="space-y-4">
        <input
          className="p-2 border rounded-lg w-full"
          type="text"
          value={newTask.task}
          onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
          placeholder="Task"
        />
        <input
          className="p-2 border rounded-lg w-full"
          type="text"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Description"
        />
        <input
          className="p-2 border rounded-lg w-full"
          type="date"
          value={newTask.date}
          onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
        />
        <button
          onClick={handleAddTask}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
        >
          Add Task
        </button>
      </div>

      {/* Edit Task Modal */}
      <Dialog.Root open={!!editingTaskId} onOpenChange={() => setEditingTaskId(null)}>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed inset-0 m-auto p-6 bg-white rounded-lg shadow-lg max-w-lg">
          <Dialog.Title className="text-2xl font-semibold mb-4">Edit Task</Dialog.Title>
          <input
            className="p-2 border rounded-lg w-full mb-4"
            type="text"
            value={editingTask.task}
            onChange={(e) => setEditingTask({ ...editingTask, task: e.target.value })}
            placeholder="Task"
          />
          <input
            className="p-2 border rounded-lg w-full mb-4"
            type="text"
            value={editingTask.description}
            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
            placeholder="Description"
          />
          <input
            className="p-2 border rounded-lg w-full mb-4"
            type="date"
            value={editingTask.date}
            onChange={(e) => setEditingTask({ ...editingTask, date: e.target.value })}
          />
          <button
            onClick={handleUpdateTask}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Update Task
          </button>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default Tasks;
