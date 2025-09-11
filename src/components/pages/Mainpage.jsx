import React, { useState, useEffect } from "react";
import CalendarComp from "../elements/CalendarComp";
import CalendarList from "../elements/CalendarList";
import HeaderComp from "../elements/HeaderComp";
import { motion } from "motion/react";

const Mainpage = () => {
  const [date, setDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [showCalen, setCalen] = useState(true);

  // ⬇ Load initial tasks from localStorage (or empty object if none)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : {};
  });

  const addTask = (dayKey, job, amount, type) => {
    setTasks((prev) => {
      const existing = prev[dayKey] || [];
      return { ...prev, [dayKey]: [...existing, { job, amount, type }] };
    });
  };

  const deleteTask = (dayKey, index) => {
    setTasks((prev) => {
      const updatedDayTasks = prev[dayKey].filter((_, i) => i !== index);
      const newTasks = { ...prev };

      if (updatedDayTasks.length > 0) {
        newTasks[dayKey] = updatedDayTasks;
      } else {
        delete newTasks[dayKey];
      }

      return newTasks;
    });
  };

  // ⬇ Save to localStorage every time tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  console.log({ date });

  return (
    <div>
      <div>
        <HeaderComp
          showCalen={showCalen}
          setCalen={setCalen}
          date={date}
          setDate={setDate}
        />
      </div>

      <div className="flex flex-col h-screen md:flex-row">
        {/* React Calendar */}
        {showCalen && (
          <div className="flex flex-col items-center max-md:flex-row">
            <CalendarComp
              date={date}
              setDate={setDate}
              activeStartDate={activeStartDate}
              setActiveStartDate={setActiveStartDate}
            />

            {/* task list */}
            <div className="flex flex-col items-center w-[350px] h-[240px] overflow-y-auto p-5 shadow-lg">
              {Object.entries(tasks).map(([dayKey, taskList], i) => (
                <div
                  key={i}
                  className="mb-2
                "
                >
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5 }}
                    className="bg-amber-50 p-5 rounded-2xl shadow-lg"
                  >
                    <h3 className="text-blue-500 border-b border-gray-400 pb-1">
                      {dayKey}
                    </h3>
                    <div className="pt-1">
                      <ul className="list-disc list-inside">
                        {taskList.map((t, j) => (
                          <li
                            key={j}
                            className="text-black max-w-[350px] break-words"
                          >
                            {t.job} : {t.amount ? `${t.amount} THB` : ""}{" "}
                            {t.type ? `| ${t.type}` : ""}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        )}

        <motion.div
          key={`${date.getFullYear()}-${date.getMonth()}`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <CalendarList
            date={date}
            activeStartDate={activeStartDate}
            tasks={tasks}
            addTask={addTask}
            deleteTask={deleteTask}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Mainpage;
