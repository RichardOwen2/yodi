'use client'

interface ReportProps {
  title: string;
  buttonLabel: string;
  onClick?: () => void;
}

const Report: React.FC<ReportProps> = ({ title, buttonLabel, onClick }) => {
  return (
    <div className="h-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 m-10 relative p-5 rounded-xl">
      <p className="text-lg font-bold">{title}</p>
      <button 
        onClick={onClick}
        className="bg-white px-3 py-1 absolute bottom-5 left-5 text-black text-center rounded-sm">
        { buttonLabel }
      </button>
    </div>
  );
}

export default Report;