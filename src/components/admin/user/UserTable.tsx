'use client'

import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Input from '@/components/inputs/Input';
import { FieldValues, useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdOutlinePageview } from 'react-icons/md';

import { BASEAPIURL } from "@/config";
import axios from "axios";
import { getToken } from "@/utils/auth"
import { useEffect, useState } from 'react';

const columns: GridColDef[] = [
  { field: 'username', headerName: 'Username', flex: 1, maxWidth: 300, headerClassName: 'font-bold', },
  { field: 'email', headerName: 'Email', flex: 1, maxWidth: 300, headerClassName: 'font-bold', },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    maxWidth: 300,
    headerClassName: 'font-bold',
    valueGetter: (params) => `${params.row.seller ? "seller" : "user"}`,
  },
  { field: 'phoneNumber', headerName: 'Nomor Telpon', flex: 1, maxWidth: 300, headerClassName: 'font-bold', },
  {
    field: 'detail',
    headerName: 'Detail',
    flex: 1,
    maxWidth: 300,
    headerClassName: 'font-bold',
    renderCell: (params) => (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto"
        onClick={() => {
          alert(`Row with id: ${params.row.id} clicked!`);
        }}
      >
        <MdOutlinePageview />
      </button>
    ),
  },
];

const rows = [
  { id: 1, username: 'Snow', status: 'banned', phoneNumber: "14022", },
  { id: 2, username: 'Lannister', status: 'active', phoneNumber: "14022", },
  { id: 3, username: 'Lannister', status: 'active', phoneNumber: "14022", },
  { id: 4, username: 'Stark', status: 'active', phoneNumber: "14022", },
  { id: 5, username: 'Targaryen', status: 'banned', phoneNumber: "14022", },
  { id: 6, username: 'Melisandre', status: "banned", phoneNumber: "14022", },
  { id: 7, username: 'Clifford', status: 'active', phoneNumber: "14022", },
  { id: 8, username: 'Frances', status: 'active', phoneNumber: "14022", },
  { id: 9, username: 'Roxie', status: 'banned', phoneNumber: "14022", },
];

export default function UserTable() {

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      search: '',
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      axios.get(`${BASEAPIURL}/admin/account?page=1&itemCount=500`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }).then((response) => {
        console.log(response)
        setRows(response.data.data.accounts)
        setLoading(false);
      }).catch((error) => {
        console.log(error.response.data.message);
      });
    }
    fetchUser();
  }, []);




  return (
    <div className="w-full my-10 bg-white p-10">
      <div className="md:flex flex-row justify-between my-5">
        <h1 className="text-xl font-bold">User List</h1>
        <div className="hidden lg:flex flex-row gap-4 mx-4">
          <AiOutlineSearch size={30} />
          <Input id={'search'} label={'search'} register={register} errors={errors} custom={true} customStyle="px-2 border-b-2 focus:outline-none" />
          <button className="bg-[#EFEB79] rounded-md px-3 py-1">Search</button>
        </div>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        loading={loading}
      />
    </div>
  );
}
