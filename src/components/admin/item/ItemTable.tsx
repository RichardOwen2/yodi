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
import Link from 'next/link';

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', flex: 1, maxWidth: 270, headerClassName: 'font-bold', },
  {
    field: 'seller',
    headerName: 'Seller Name',
    flex: 1, maxWidth: 270,

    headerClassName: 'font-bold',
    valueGetter: (params) => `${params.row.seller.user.username}`,
  },
  { field: 'createdAt', headerName: 'diajukan pada', flex: 1, maxWidth: 270, headerClassName: 'font-bold', },
  {
    field: 'detail',
    headerName: 'Detail',
    flex: 1, maxWidth: 270,
    headerClassName: 'font-bold',
    renderCell: (params) => (
      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto"
        href={`admin/item/${params.row.id}`}
      >
        <MdOutlinePageview />
      </Link>
    ),
  },
];


const defaultRows = [
  { id: 1, title: '...', seller: { user: { username: '...' } }, createdAt: "...", },
];

export default function ItemTable() {
  const [rows, setRows] = useState(defaultRows);
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
    const fetchItem = () => {
      axios.get(`${BASEAPIURL}/admin/item?page=1&itemCount=500`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }).then((response) => {
        console.log(response);
        setRows(response.data.data.items);
        setLoading(false);
      }).catch((error) => {
        console.log(error.response.data.message);
      });
    }
    fetchItem();
  }, []);
  console.log(rows)


  return (
    <div className="my-10 bg-white p-10">
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
        loading={loading}
      // checkboxSelection
      />
    </div>
  );
}
