
import React from 'react';

interface TimeGridProps {
  schedule: Record<number, { '00': string; '30': string }>;
  onScheduleChange: (hour: number, slot: '00' | '30', value: string) => void;
}

const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7 AM to 8 PM (20:00)

const EditableCell: React.FC<{ value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }> = ({ value, onChange }) => (
    <textarea
        value={value}
        onChange={onChange}
        className="w-full h-full p-2 bg-transparent resize-none border-l border-gray-300 focus:outline-none focus:bg-blue-50"
        rows={3}
    />
);

export const TimeGrid: React.FC<TimeGridProps> = ({ schedule, onScheduleChange }) => {
  return (
    <div className="w-full border border-gray-300 rounded-md overflow-hidden">
      <div className="grid grid-cols-[auto_1fr_1fr]">
        {/* Header */}
        <div className="p-2 font-bold bg-gray-100 border-b border-gray-300"></div>
        <div className="p-2 font-bold bg-gray-100 border-b border-l border-gray-300 text-center">00:00</div>
        <div className="p-2 font-bold bg-gray-100 border-b border-l border-gray-300 text-center">00:30</div>

        {/* Rows */}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="p-2 font-bold bg-gray-100 border-t border-gray-300 flex items-center justify-center">
              {hour}
            </div>
            <div className="border-t border-gray-300">
               <EditableCell 
                    value={schedule[hour]['00']} 
                    onChange={(e) => onScheduleChange(hour, '00', e.target.value)}
                />
            </div>
            <div className="border-t border-gray-300">
                <EditableCell 
                    value={schedule[hour]['30']} 
                    onChange={(e) => onScheduleChange(hour, '30', e.target.value)}
                />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
