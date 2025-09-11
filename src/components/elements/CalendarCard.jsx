import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pre } from "motion/react-client";

const CalendarCard = ({
  date,
  isSelected,
  tasks,
  addTask,
  isprev,
  deleteTask,
}) => {
  const [showInput, setShowInput] = useState(false);

  const [newTask, setNewTask] = useState("");
  const [taskAmout, setTaskAmount] = useState("");
  const [taskType, setTaskType] = useState("income");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    addTask(newTask, taskAmout, taskType);
    setNewTask("");
    setTaskAmount("");
    setTaskType("income");
    setShowInput(false);
  };

  return (
    <div
      className={`group flex flex-col font-serif border-b-3 shadow-sm relative
    ${isSelected ? "bg-blue-300" : isprev ? "bg-gray-400" : "bg-indigo-50"} 
    text-zinc-950 border-gray-400`}
    >
      {/* Date */}
      <div className="text-xs font-bold px-2 py-1 border-b border-gray-300 text-center">
        {date}
      </div>

      {/* Task List */}
      <div className="flex-1 p-2 flex flex-col gap-1 overflow-y-auto min-h-32 max-h-32 text-xs">
        {tasks.map((task, i) => (
          <div key={i}>
            <TaskButton
              taskname={task.job}
              amount={task.amount}
              deleteTask={() => deleteTask(i)}
              isIncome={task.type === "income"}
            />
          </div>
        ))}
      </div>

      {/* Add Task Button - only visible on hover */}
      <button
        onClick={() => setShowInput((prev) => !prev)}
        className="absolute bottom-1 right-1 bg-green-500 text-white text-xs px-2 py-1 rounded shadow
               opacity-0 max-sm:opacity-100 group-hover:opacity-100 transition-opacity duration-200 hover:bg-zinc-700 hover:cursor-pointer"
      >
        {showInput ? "-" : "+"}
      </button>
      {/* Dropdown Panel with Animation */}
      <AnimatePresence>
        {showInput && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-full top-0 ml-2 w-48 bg-white shadow-lg rounded-lg p-3 z-10"
          >
            <div>
              <h2>Type your task</h2>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter task..."
                className="border p-1 text-sm rounded"
              />
              <input
                type="number"
                value={taskAmout}
                onChange={(e) => setTaskAmount(e.target.value)}
                placeholder="Enter amount..."
                className="border p-1 text-sm rounded"
              />
              <select
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
                className="border p-1 text-sm rounded"
              >
                <option value="income">Income</option>
                <option value="outcome">Outcome</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  disabled={!newTask.trim() || !taskAmout.trim()}
                  className={`px-2 py-1 text-xs rounded text-white ${
                    !newTask.trim() || !taskAmout.trim()
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
                  }`}
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowInput(false)}
                  className="px-2 py-1 text-xs bg-red-500 rounded text-white hover:bg-gray-500 hover:cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarCard;

export const TaskButton = ({ taskname, amount, isIncome, deleteTask }) => {
  const [opened, setOpened] = useState(false);
  const ref = useRef(null);

    useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpened(false);
      }
    };

    if (opened) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [opened]);

  return (
    <div ref={ref}>
      {/* Button */}
      <button
        onClick={() => setOpened((prev) => !prev)}
        className={`w-full truncate rounded-md px-2 py-1 text-xs ${
          isIncome ? "bg-green-400" : "bg-red-500"
        } text-white hover:bg-zinc-700 transition hover:cursor-pointer shadow-lg`}
      >
        {amount} THB
      </button>

      
      {/* task detail button */}
      {opened && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-full top-0 ml-2 w-48 bg-white shadow-lg rounded-lg p-3 z-10"
        >
          <h2>{taskname}</h2>
          <h2>cash : {amount} บาท</h2>
          <button
            onClick={() => setOpened((prev) => !prev)}
            className="px-2 py-1 text-xs bg-gray-500 rounded text-white hover:bg-gray-500 hover:cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={deleteTask}
            className="px-2 py-1 text-xs bg-red-500 rounded text-white hover:bg-red-1000 hover:cursor-pointer"
          >
            Delete
          </button>
        </motion.div>
      )}
    </div>
  );
};