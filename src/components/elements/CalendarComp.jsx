import React from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "./CalendarStyle.css";
import { motion, AnimatePresence } from "motion/react";

function CalendarComp({ date, setDate, setActiveStartDate }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col justify-center"
    >
      <Calendar
        onChange={setDate}
        value={date}
        onActiveStartDateChange={({ activeStartDate }) => {
          setActiveStartDate(activeStartDate);
          setDate(activeStartDate);
        }}
      />
      {/* <p className="text-white">Selected Date: {date.toDateString()}</p> */}
    </motion.div>
  );
}

export default CalendarComp;
