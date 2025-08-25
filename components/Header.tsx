
import React from 'react';
import { dateToYYYYMMDD, yyyymmddToDate } from '../utils/dateUtils';

interface HeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onGoToToday: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentDate, onDateChange, onGoToToday }) => {
  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const date = yyyymmddToDate(e.target.value);
      if(date) {
        onDateChange(date);
      }
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-black pb-2">
      <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">The Time Box</h1>
          <button
              onClick={onGoToToday}
              title="Go to today's date"
              className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
              Today
          </button>
      </div>

      <div className="flex items-center gap-2 mt-4 sm:mt-0">
        <span className="font-semibold">Date:</span>
        <input
          type="date"
          value={dateToYYYYMMDD(currentDate)}
          onChange={handleDateInputChange}
          className="p-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Select Date"
        />
      </div>
    </header>
  );
};
