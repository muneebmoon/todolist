import React from 'react';


function TaskModal({ newTask, setNewTask, addNewTask, closeModal, setNewDescription, newDescription, isEdit }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg w-96">

        <h2 className="text-xl font-bold mb-4">
          {isEdit ? "Edit Task" : "Add Task"}
        </h2>
        <p className='text-red-500 mb-4'>Task title is required</p>

        <input
          type="text"
          className="border w-full p-2 mb-4"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter Title..."
        />

        <textarea
          className="border w-full p-2 mb-4"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Enter description..."
        />

        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={closeModal}
          >
            Cancel
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={addNewTask}
            disabled={!newTask.trim()}
          >
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}


export default TaskModal;