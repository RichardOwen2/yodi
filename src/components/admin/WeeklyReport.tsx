'use client'

import Button from "../Button";

const WeeklyReport = () => {
  return (
    <div className="h-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 m-10 relative p-5 rounded-xl">
      <p className="text-lg font-bold">Weekly Report</p>
      <button 
        onClick={() => {}}
        className="bg-white px-3 py-1 absolute bottom-5 left-5 text-black text-center rounded-sm">
        View Report
      </button>
    </div>
  );
}

export default WeeklyReport