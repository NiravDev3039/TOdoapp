"use client";
import React, { useState } from "react";
import { PlusCircle, Trash2, Edit2, Check, X } from "lucide-react";
import { useTransition, animated } from "react-spring";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([{ id: Date.now(), text: newTask }, ...tasks]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const updateTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );
    setEditingId(null);
  };

  const transitions = useTransition(tasks, {
    from: { opacity: 0, transform: 'translateY(-20px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(-20px)' },
    keys: task => task.id,
  });

  return (
    <div className="bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 min-h-screen p-8 font-sans">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Todo App
          </h1>
          <form onSubmit={addTask} className="mb-6">
            <div className="flex items-center bg-gray-100 rounded-lg p-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
                className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-500"
              />
              <button
                type="submit"
                className="ml-2 text-purple-600 hover:text-purple-800 transition-colors duration-300"
              >
                <PlusCircle size={24} />
              </button>
            </div>
          </form>
          <ul className="space-y-3">
            {transitions((style, task) => (
              <animated.li
                style={style}
                key={task.id}
                className="bg-gray-50 rounded-lg shadow-md overflow-hidden"
              >
                {editingId === task.id ? (
                  <div className="p-3 flex items-center">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="flex-grow bg-white p-2 rounded-lg mr-2 outline-none"
                    />
                    <button
                      onClick={() => updateTask(task.id)}
                      className="text-green-600 hover:text-green-800 mr-2"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="p-3 flex justify-between items-center">
                    <span className="text-gray-800">{task.text}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing(task.id, task.text)}
                        className="text-yellow-600 hover:text-yellow-800 transition-colors duration-300"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-300"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </animated.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;