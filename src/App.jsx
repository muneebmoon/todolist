import React, { useEffect, useState } from 'react';
import Card from './components/Card';

function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);


  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  function addNewTask(e) {
    e.preventDefault();
    if (newTask.trim() === '') {
      alert('Please enter a task');
      return;
    }
    const updatedTasks = [...tasks, { text: newTask, completed: false }];
    saveTasks(updatedTasks);
    setNewTask('');
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    saveTasks(updatedTasks);
  }

  function editTask(index) {
    const newTaskName = prompt('Enter the new task name:', tasks[index].text);
    if (newTaskName && newTaskName.trim() !== '') {
      const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, text: newTaskName } : task
      );
      saveTasks(updatedTasks);
    }
  }

  function handleComplete(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
  }

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="appContainer">
      <div className="heading">
        <h1 className='text-6xl text-center p-10 bg-[#F2B50B]'>Todo App</h1>
      </div>


      <div className="cards flex items-center justify-center gap-10 p-10">
        <Card title="Total Tasks" count={tasks.length} color="bg-blue-500" />
        <Card title="Completed Tasks" count={completedCount} color="bg-green-500" />
      </div>


      <div className="addNewField flex flex-col items-center justify-center gap-4 p-5">
        <h1 className='text-2xl font-bold text-center'>Add New Task</h1>
        <input
          type="text"
          className="border-2 border-gray-300 rounded-lg p-2 w-full max-w-md"
          placeholder='Add new task'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-lg ml-4 cursor-pointer'
          onClick={addNewTask}
        >
          Add Task
        </button>
      </div>


      <div className="taskTable w-full max-w-2xl mx-auto p-5">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Tasks</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td
                  className="border border-gray-300 p-2"
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "gray" : "black"
                  }}
                >
                  {task.text}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    className='bg-green-500 text-white px-2 py-1 rounded mr-2 cursor-pointer'
                    onClick={() => handleComplete(index)}
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    className='bg-blue-500 text-white px-2 py-1 rounded mr-2 cursor-pointer'
                    onClick={() => editTask(index)}
                  >
                    Edit
                  </button>
                  <button
                    className='bg-red-500 text-white px-2 py-1 rounded mr-2 cursor-pointer'
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App;
