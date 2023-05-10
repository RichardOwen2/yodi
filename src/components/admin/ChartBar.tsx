'use client'

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS, ChartOptions } from "chart.js";
import { Bar } from 'react-chartjs-2';


interface ChartProps{
  data: any;
}

const options: ChartOptions = {
  maintainAspectRatio: false,
  responsive: true,
};

Chart.register(CategoryScale);

const ChartBar: React.FC<ChartProps> = ({ data }) => {
  return ( 
    <div className="text-center">
      <Bar data={data} options={options} />
    </div>
    );
}
 
export default ChartBar;