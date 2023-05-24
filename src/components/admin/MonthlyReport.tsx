'use client'

const MonthlyReport = () => {
  return (
    <div className="h-52 bg-[url('/images/stocks.jpg')] bg-no-repeat bg-cover mb-4 relative p-5 rounded-xl">
      <p className="text-lg font-bold text-white">Monthly Report</p>
      <button
        onClick={() => { }}
        className="bg-white px-3 py-1 absolute bottom-5 left-5 text-black text-center rounded-sm">
        View Report
      </button>
    </div>
  );
}

export default MonthlyReport;