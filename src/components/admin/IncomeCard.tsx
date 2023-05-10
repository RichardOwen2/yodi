'use client'

import ChartBar from "./ChartBar";
import { BsArrowUpCircle } from "react-icons/bs";

interface IncomeCard {
  title: string;
  income: string;
  data: any;
  customStyle?: string;
}
  
const IncomeCard: React.FC<IncomeCard> = ({title, income, data, customStyle = "bg-white"}) => {
  return (
    <div 
      className={`
      h-60 mb-4 p-5 rounded-xl
      ${customStyle}
    `}>
      <div className="flex flex-row mx-auto justify-between">
        <div>
          <p className="text-lg font-bold text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{income}</p>
        </div>
          <BsArrowUpCircle size={20} />
      </div>
      <ChartBar data={data} />
    </div>
  );
}

export default IncomeCard;