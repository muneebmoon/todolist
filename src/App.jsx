import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import TaskModal from './components/modals/TaskModal';

function App() {
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

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
    let updatedTasks;

    if (editIndex !== null) {
      updatedTasks = tasks.map((task, i) =>
        i === editIndex ? { ...task, title: newTask, description: newDescription } : task
      );
    } else {
      updatedTasks = [...tasks, { title: newTask, description: newDescription, completed: false }];
    }
    saveTasks(updatedTasks);
    setNewTask('');
    setNewDescription('');
    setEditIndex(null);
    setIsModalOpen(false);
  }


  function deleteTask(index) {

    if (window.confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = tasks.filter((task, i) => i !== index);
      saveTasks(updatedTasks);
      setNewTask('');
      setNewDescription('');
    }
  }

  function editTask(index) {
    setNewTask(tasks[index].title);
    setNewDescription(tasks[index].description);
    setEditIndex(index);
    setIsModalOpen(true);
  }

  function handleComplete(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
  }

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Heading */}
      <div className="heading">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center py-6 md:py-10  font-bold">
          Todo App
        </h1>
      </div>

      {/* Cards */}
      <div className="cards flex flex-col md:flex-row items-center justify-center gap-6 p-6 md:p-10">
        <Card title="Total Tasks" count={tasks.length} color="bg-blue-500" />
        <Card title="Completed Tasks" count={completedCount} color="bg-green-500" />
      </div>

      {/* Add Task Button */}
      <div className="flex flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-xl md:text-2xl font-bold text-center">
          Add New Task
        </h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white w-100 px-6 py-2 rounded-lg cursor-pointer transition"
          onClick={() => setIsModalOpen(true)}
        >
          Add Task
        </button>
      </div>


      {/* Table */}

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 mt-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-500">
            No tasks added yet!
          </h2>
        </div>
      ) : (
        <div className="w-full px-4 md:px-10 py-6">
          <div className="overflow-x-auto">
            <table className="mx-auto border-collapse border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-sm md:text-base">
                  <th className="border p-2">Tasks</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index} className="border-b text-sm md:text-base text-center">
                    <td
                      className="border p-2"
                      style={{
                        textDecoration: task.completed ? "line-through" : "none",
                        color: task.completed ? "gray" : "black"
                      }}
                    >
                      {task.title}
                    </td>
                    <td className="border p-2 max-w-xs">
                      <div
                        className="truncate"
                        style={{
                          textDecoration: task.completed ? "line-through" : "none",
                          color: task.completed ? "gray" : "black",
                        }}
                        title={task.description}
                      >
                        {task.description}
                      </div>
                    </td>
                    <td className="border p-2">
                      {task.completed ? (
                        <span className="text-green-500 font-bold">Completed</span>
                      ) : (
                        <span className="text-red-500 font-bold">Pending</span>
                      )}
                    </td>

                    <td className="border p-2">
                      <div className="flex flex-wrap gap-2 justify-center">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded cursor-pointer"
                          onClick={() => handleComplete(index)}
                        >
                          {task.completed ? "Undo" : "Complete"}
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded cursor-pointer"
                          onClick={() => editTask(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded cursor-pointer"
                          onClick={() => deleteTask(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
              </tbody>
            </table>
          </div>
        </div>

      )}
      {isModalOpen && (
        <TaskModal
          newTask={newTask}
          setNewTask={setNewTask}
          addNewTask={addNewTask}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          closeModal={() => setIsModalOpen(false)}
          isEdit={editIndex !== null}
        />
      )}
    </div>
  );
}

export default App;
