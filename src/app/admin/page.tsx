import Avatar from "@/components/Avatar";
import ClientOnly from "@/components/ClientOnly";
import AccountReport from "@/components/admin/AccountReport";
import IncomeCard from "@/components/admin/IncomeCard";
import ItemReport from "@/components/admin/ItemReport";
import MonthlyReport from "@/components/admin/MonthlyReport";
import WeeklyReport from "@/components/admin/WeeklyReport";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales',
      data: [10, 20, 30, 40, 50, 60, 70],
      fill: false,
      backgroundColor: 'rgba(239, 235, 121, 1)',
      borderColor: 'rgba(0, 0, 0, 1)',
    },
    {
      label: 'bruh',
      data: [10, 20, 30, 40, 50, 60, 70],
      fill: false,
      backgroundColor: 'rgba(0, 0, 0, 1)',
      borderColor: 'rgba(0, 0, 0, 1)',
    },
  ],
};

export default function Dashboard() {
  return (
    <div className="lg:flex flex-row justify-between gap-14 mt-3">
      <div className="bg-[#EFEB79] w-full md:px-5 py-2 rounded-lg">
        <div className="flex flex-row justify-between px-10 py-5">
          <div>
            <h2 className="text-lg font-bold">Today Work</h2>
            <h4 className="text-md font">Laporan Harian YODI</h4>
          </div>
          <Avatar src="" height={50} width={50} />
        </div>
        <div className="text-white">
          <WeeklyReport />
          <div className="md:flex flex-row w-full justify-between px-10 gap-3">
            <ItemReport />
            <AccountReport />
          </div>
        </div>
      </div>
      <div className="w-full mt-3 lg:mt-0">
        <MonthlyReport />
        <IncomeCard title={"Revenue"} income={"Rp. 25.000.000"} data={data} customStyle={"bg-[#E9CA7B]"} />
        <IncomeCard title={"Expences"} income={"Rp. 25.000.000"} data={data} customStyle={"bg-[#B6BDF9]"} />
      </div>
    </div>
  )
}
