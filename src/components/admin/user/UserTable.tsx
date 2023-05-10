'use client'

import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Input from '@/components/inputs/Input';
import { FieldValues, useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdOutlinePageview } from 'react-icons/md';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1, headerClassName: 'font-bold', },
  { field: 'username', headerName: 'Username', flex: 1, headerClassName: 'font-bold', },
  { field: 'status', headerName: 'Status', flex: 1, headerClassName: 'font-bold', },
  { field: 'phoneNumber', headerName: 'Nomor Telpon', flex: 1, headerClassName: 'font-bold', },
  {
    field: 'detail',
    headerName: 'Detail',
    flex: 1,
    headerClassName: 'font-bold',
    renderCell: (params) => (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto"
          onClick={() => {
            alert(`Row with id: ${params.row.id} clicked!`);
          }}
        >
          <MdOutlinePageview/>
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

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

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
      />
    </div>
  );
}
