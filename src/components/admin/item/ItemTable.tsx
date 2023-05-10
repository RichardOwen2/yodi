'use client'

import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Input from '@/components/inputs/Input';
import { FieldValues, useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdOutlinePageview } from 'react-icons/md';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1, headerClassName: 'font-bold', },
  { field: 'title', headerName: 'Title', flex: 1, headerClassName: 'font-bold', },
  { field: 'seller', headerName: 'Seller Name', flex: 1, headerClassName: 'font-bold', },
  { field: 'created_at', headerName: 'diajukan pada', flex: 1, headerClassName: 'font-bold', },
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
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.title || ''} ${params.row.seller || ''}`,
  // },
];

const rows = [
  { id: 1, title: 'Snow', seller: 'Jon', created_at: "2022-08-13 03:49:39", },
  { id: 2, title: 'Lannister', seller: 'Cersei', created_at: "2022-08-13 03:49:39", },
  { id: 3, title: 'Lannister', seller: 'Jaime', created_at: "2022-08-13 03:49:39", },
  { id: 4, title: 'Stark', seller: 'Arya', created_at: "2022-08-13 03:49:39", },
  { id: 5, title: 'Targaryen', seller: 'Daenerys', created_at: "2022-08-13 03:49:39", },
  { id: 6, title: 'Melisandre', seller: "dylan", created_at: "2022-08-13 03:49:39", },
  { id: 7, title: 'Clifford', seller: 'Ferrara', created_at: "2022-08-13 03:49:39", },
  { id: 8, title: 'Frances', seller: 'Rossini', created_at: "2022-08-13 03:49:39", },
  { id: 9, title: 'Roxie', seller: 'Harvey', created_at: "2022-08-13 03:49:39", },
];

export default function ItemTable() {

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
        <h1 className="text-xl font-bold">Item List</h1>
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
