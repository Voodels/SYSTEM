import React, { useState } from 'react';
import Tasks from '../components/Tasks.js';

const bentoItems = [
  { id: 'tasks', title: 'Tasks', icon: '🔍', component: <Tasks /> },
  { id: 'calendar1', title: 'Calendar', icon: '📅', component: <p>Calendar Placeholder</p> },
  { id: 'notes1', title: 'Notes', icon: '📝', component: <p>Notes Placeholder</p> },
  { id: 'analytics1', title: 'Analytics', icon: '📊', component: <p>Analytics Placeholder</p> },
  { id: 'calendar2', title: 'Calendar', icon: '📅', component: <p>Calendar Placeholder</p> },
  { id: 'notes2', title: 'Notes', icon: '📝', component: <p>Notes Placeholder</p> },
  { id: 'analytics2', title: 'Analytics', icon: '📊', component: <p>Analytics Placeholder</p> },
];

export default function Home() {
  return (
    <div className="bg-gray-900 text-white p-8 min-h-screen">
      <h1 className="text-center mb-8 text-4xl">Home</h1>
      <div className="grid auto-rows-[192px] grid-cols-3 gap-4">
        {bentoItems.map((item, index) => (
          <div
            key={item.id}
            className={`row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900 ${
              index === 3 || index === 6 ? "col-span-2" : ""
            }`}
          >
            <BentoCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}

function BentoCard({ title, icon, component }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl text-gray-200">{title}</h2>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="flex-grow overflow-hidden mb-2">
        {component}
      </div>
      <button
        className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 mt-auto"
        onClick={() => setOpen(true)}
      >
        View Full
      </button>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-gray-800 rounded-lg p-6 w-4/5 h-4/5 overflow-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl mb-4">{title}</h2>
            <div>{component}</div>
            <button
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}