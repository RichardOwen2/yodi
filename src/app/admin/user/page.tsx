import UserTable from "@/components/admin/user/UserTable";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";

const Item = () => {
  return (
    <div className="bg-[#F5F5F5] flex">
      <Sidebar />

      {/* content */}
      <div className="w-full text-black shadow-sm px-5 md:px-16 py-7">
        <Navbar />
        <UserTable />
      </div>
    </div>
  );
}

export default Item;