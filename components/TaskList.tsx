
import React from 'react';

interface TaskListProps {
  title: string;
  items: string[];
  onItemChange: (index: number, value: string) => void;
  icon: string;
}

export const TaskList: React.FC<TaskListProps> = ({ title, items, onItemChange, icon }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-md h-full">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-lg font-mono text-gray-500">{icon}</span>
            <input
              type="text"
              value={item}
              onChange={(e) => onItemChange(index, e.target.value)}
              className="w-full bg-transparent border-b-2 border-dotted border-gray-300 focus:border-solid focus:border-blue-500 focus:outline-none transition-colors"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
