import { useState, useRef, useEffect } from "react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const ref = useRef();

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getStartDay = (month, year) => new Date(year, month, 1).getDay();

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateSelect = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const goToNextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );

  const goToPrevMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );

  const renderDays = () => {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    const totalDays = daysInMonth(month, year);
    const startDay = getStartDay(month, year);
    const today = new Date();

    let days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`blank-${i}`} className="w-10 h-10" />);
    }

    for (let i = 1; i <= totalDays; i++) {
      const isToday =
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      const isSelected =
        selectedDate &&
        i === selectedDate.getDate() &&
        month === selectedDate.getMonth() &&
        year === selectedDate.getFullYear();

      days.push(
        <div
          key={i}
          onClick={() => handleDateSelect(i)}
          className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-full
            ${isToday ? "text-indigo-500 font-bold" : "text-gray-700"}
            ${isSelected ? "bg-indigo-500 text-white" : "hover:bg-indigo-100"}`}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="relative w-[100%] mt-2" ref={ref}>
      <input
        onClick={() => setShowCalendar(!showCalendar)}
        readOnly
        value={
            selectedDate
              ? selectedDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                })
              : "Select a date"
        }          
        className="w-full px-3 py-2 border text-[14px] text-md border-gray-300 rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-600 text-gray-900 font-semibold bg-white"
      />

      {showCalendar && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-white shadow-lg rounded-xl border z-10 w-80">
          <div className="flex justify-between items-center mb-3">
            <button 
              type="button"
              onClick={goToPrevMonth}
              className="text-gray-400 hover:text-gray-700"
            >
              ←
            </button>
            <h2 className="text-lg font-semibold text-gray-700">
              {currentMonth.toLocaleString("default", {
                month: "long",
              })}{" "}
              {currentMonth.getFullYear()}
            </h2>
            <button
              type="button"
              onClick={goToNextMonth}
              className="text-gray-400 hover:text-gray-700"
            >
              →
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 font-medium">
            {WEEKDAYS.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 mt-2 text-sm">
            {renderDays()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
