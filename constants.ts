
import type { TimeBoxData } from './types';

const generateInitialSchedule = (): TimeBoxData['schedule'] => {
  const schedule: TimeBoxData['schedule'] = {};
  for (let i = 7; i <= 20; i++) {
    schedule[i] = { '00': '', '30': '' };
  }
  return schedule;
};

export const getInitialDataForDate = (date: Date): TimeBoxData => {
    const year = date.getUTCFullYear().toString();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');

    return {
        date: {
            month,
            day,
            year,
        },
        priorities: Array(6).fill(''),
        brainDump: Array(7).fill(''),
        schedule: generateInitialSchedule(),
    };
};
