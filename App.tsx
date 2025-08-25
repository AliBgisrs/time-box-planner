import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { TimeGrid } from './components/TimeGrid';
import type { TimeBoxData } from './types';
import { getInitialDataForDate } from './constants';
import { getLocalStorageKey, yyyymmddToDate } from './utils/dateUtils';

const loadDataForDate = (date: Date): TimeBoxData => {
  const key = getLocalStorageKey(date);
  try {
    const savedData = localStorage.getItem(key);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      // Basic validation
      if (parsed.schedule && parsed.priorities && parsed.brainDump && parsed.date) {
        return parsed;
      }
    }
  } catch (error) {
    console.error(`Error loading data for ${key} from localStorage`, error);
  }
  return getInitialDataForDate(date);
};

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(() => yyyymmddToDate(new Date().toISOString().split('T')[0]) || new Date());
  const [data, setData] = useState<TimeBoxData>(() => loadDataForDate(currentDate));

  // Load data when the selected date changes
  useEffect(() => {
    setData(loadDataForDate(currentDate));
  }, [currentDate]);

  // Save data whenever it's updated
  useEffect(() => {
    const key = getLocalStorageKey(currentDate);
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error)
      {
      console.error(`Error saving data for ${key} to localStorage`, error);
    }
  }, [data, currentDate]);

  const handleDateChange = useCallback((newDate: Date) => {
    setCurrentDate(newDate);
  }, []);

  const goToToday = useCallback(() => {
    // Use a function that correctly handles timezone by creating a UTC date from YYYY-MM-DD
    setCurrentDate(yyyymmddToDate(new Date().toISOString().split('T')[0]) || new Date());
  }, []);

  const handleTaskChange = useCallback((type: 'priorities' | 'brainDump', index: number, value: string) => {
    setData(prevData => {
      const newList = [...prevData[type]];
      newList[index] = value;
      return { ...prevData, [type]: newList };
    });
  }, []);

  const handleScheduleChange = useCallback((hour: number, slot: '00' | '30', value: string) => {
    setData(prevData => ({
      ...prevData,
      schedule: {
        ...prevData.schedule,
        [hour]: {
          ...prevData.schedule[hour],
          [slot]: value
        }
      }
    }));
  }, []);

  return (
    <div className="min-h-screen font-sans text-gray-800 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200 p-4 sm:p-6">
        <Header currentDate={currentDate} onDateChange={handleDateChange} onGoToToday={goToToday} />
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          <div className="lg:col-span-1 flex flex-col gap-6">
            <TaskList
              title="Top Priorities"
              items={data.priorities}
              onItemChange={(index, value) => handleTaskChange('priorities', index, value)}
              icon=">"
            />
            <TaskList
              title="Brain Dump"
              items={data.brainDump}
              onItemChange={(index, value) => handleTaskChange('brainDump', index, value)}
              icon="❖"
            />
          </div>
          <div className="lg:col-span-2">
            <TimeGrid schedule={data.schedule} onScheduleChange={handleScheduleChange} />
          </div>
        </main>
      </div>
       <footer className="text-center text-gray-400 text-sm mt-4 pb-2">
        <p>Time Box Planner | Installable &amp; Offline-ready</p>
      </footer>
    </div>
  );
};

export default App;