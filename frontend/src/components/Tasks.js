import React, { useState, useEffect, useRef } from 'react';
import ApiHandler from '../services/api';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Progress from '@radix-ui/react-progress';
import { Sun, Moon, Plus, Edit, Trash2 } from 'lucide-react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({ task: '', description: '', date: '' });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState({ task: '', description: '', date: '' });
  const [darkMode, setDarkMode] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const observerRef = useRef(null);

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

    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 150);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (isSmallScreen) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} flex items-center justify-center`}>
        <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg text-center`}>
          <h1 className="text-lg font-bold mb-2">Tasks</h1>
          <p className="text-sm">{tasks.length} task(s)</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-white'}`}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {loading ? (
          <Progress.Root className={`relative ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full w-full h-4 mb-4`}>
            <Progress.Indicator
              className="bg-blue-500 h-full rounded-full"
              style={{ width: '50%' }}
            />
          </Progress.Root>
        ) : (
          <ul className="space-y-4">
            {tasks.length > 0 ? (
              tasks.map(task => (
                <li key={task._id} className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{task.task}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{task.description}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{task.date}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Tooltip.Provider>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <button
                              onClick={() => handleEditTask(task)}
                              className={`p-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg transition`}
                            >
                              <Edit size={16} />
                            </button>
                          </Tooltip.Trigger>
                          <Tooltip.Content className={`p-2 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg`}>
                            Edit Task
                          </Tooltip.Content>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                      <Tooltip.Provider>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <button
                              onClick={() => handleDeleteTask(task._id)}
                              className={`p-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg transition`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </Tooltip.Trigger>
                          <Tooltip.Content className={`p-2 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg`}>
                            Delete Task
                          </Tooltip.Content>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow text-center`}>No tasks available</li>
            )}
          </ul>
        )}

        <div ref={observerRef} className="w-full h-20 flex justify-center items-center">
          {loading && <div className={`spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full ${darkMode ? 'border-gray-300' : 'border-gray-700'}`} />}
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Add New Task</h2>
        <div className="space-y-4">
          <input
            className={`p-2 border rounded-lg w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
            type="text"
            value={newTask.task}
            onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
            placeholder="Task"
          />
          <input
            className={`p-2 border rounded-lg w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
            type="text"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            placeholder="Description"
          />
          <input
            className={`p-2 border rounded-lg w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
            type="date"
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
          />
          <button
            onClick={handleAddTask}
            className={`p-2 ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white rounded-lg transition flex items-center justify-center w-full`}
          >
            <Plus size={20} className="mr-2" /> Add Task
          </button>
        </div>

        <Dialog.Root open={!!editingTaskId} onOpenChange={() => setEditingTaskId(null)}>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className={`fixed inset-0 m-auto p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto`}>
            <Dialog.Title className="text-2xl font-semibold mb-4">Edit Task</Dialog.Title>
            <input
              className={`p-2 border rounded-lg w-full mb-4 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              type="text"
              value={editingTask.task}
              onChange={(e) => setEditingTask({ ...editingTask, task: e.target.value })}
              placeholder="Task"
            />
            <input
              className={`p-2 border rounded-lg w-full mb-4 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              type="text"
              value={editingTask.description}
              onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
              placeholder="Description"
            />
            <input
              className={`p-2 border rounded-lg w-full mb-4 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              type="date"
              value={editingTask.date}
              onChange={(e) => setEditingTask({ ...editingTask, date: e.target.value })}
            />
            <button
              onClick={handleUpdateTask}
              className={`p-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg transition w-full`}
            >
              Update Task
            </button>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </div>
  );
};

export default Tasks;