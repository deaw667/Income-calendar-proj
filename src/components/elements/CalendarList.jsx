import React from "react";
import CalendarCard from "./CalendarCard";

const CalendarList = ({ date, tasks, addTask, activeStartDate,deleteTask }) => {
  const year = activeStartDate.getFullYear();
  const month = activeStartDate.getMonth();
  let daysName = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

  // Days in this month and previous month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // First weekday of this month (Monday = 0, Sunday = 6)
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;

  // Build days grid
  const days = [];

  // Add previous month's trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const prevDate = new Date(year, month, -i);
    days.push(prevDate);
  }

  // Add current month's days
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(year, month, d));
  }

  return (
    <div>
      {/* Weekday header */}
      <div className="p-1 grid grid-cols-7 max-sm:hidden">
        {daysName.map((day, i) => (
          <div
            key={i}
            className="text-xs text-black bg-gray-100 font-bold px-2 py-1 border-b border-gray-300 text-center"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 max-sm:grid-cols-3">
        {days.map((day, i) => {
          const dayKey = day.toISOString().split("T")[0]; // "YYYY-MM-DD"
          return (
            <CalendarCard
              key={i}
              date={day.getDate()}
              isSelected={day.toDateString() === date.toDateString()}
              isprev={day.getMonth() !== month}
              tasks={tasks[dayKey] || []}
              isIncome={tasks.type === "income"}
              addTask={(job,amount, type) => addTask(dayKey, job, amount, type)}
              deleteTask={(index) => deleteTask(dayKey, index)} 
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarList;