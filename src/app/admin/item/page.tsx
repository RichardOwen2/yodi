import ItemTable from "@/components/admin/item/ItemTable";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";


const Item = () => {
  return ( 
    <div className="bg-[#F5F5F5] flex">
      <Sidebar />

      {/* content */}
      <div className="w-full text-black shadow-sm px-5 md:px-16 py-7">
        <Navbar />
        <ItemTable />
      </div>
    </div>
   );
}
 
export default Item;