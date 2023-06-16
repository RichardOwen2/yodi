'use client'

import axios from "axios";

import { BASEURL } from "@/config";
import { FieldValues, RegisterOptions, SubmitHandler, UseFormRegisterReturn, useForm } from "react-hook-form";
import { MouseEvent, useState } from "react";
import { getToken, setToken } from "@/utils/auth";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import Input from "@/components/inputs/Input";

const create = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      descirption: '',
      images: [
        {
          iamge: '',
        },
        {
          iamge: '',
        },
        {
          iamge: '',
        }
      ],
      itemVariant: [
        {
          label: '',
          price: '',
          stock: '',
        }
      ]
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios.post(`${BASEURL}/api/partner/item`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      ...data
    }).then((response) => {
      setToken(response.data.data.token)
      toast.success('data berhasil ditambahkan');
      // loginModal.onClose();
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
    setIsLoading(false);
  }

  return (
    <div className="bg-white p-5">
      <div className="my-2">
        <h2 className="text-lg font-bold pt-2 pb-1">Informasi Produk</h2>
        <Input id={"title"} label={"title"} register={register} errors={errors} required />
      </div>

      <div className="my-2">
        <h2 className="text-lg font-bold pt-2 pb-1">Detail Produk</h2>
        <div className="py-2">
          <h1 className="text-md font-semibold">Gambar 1</h1>
          <Input id={"image"} label={"image"} type="file" register={register} errors={errors} custom={true} customStyle="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none" />
        </div>
        <div className="py-2">
          <h1 className="text-md font-semibold">Gambar 2 *opsional</h1>
          <Input id={"image"} label={"image"} type="file" register={register} errors={errors} custom={true} customStyle="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none" />
        </div>
        <div className="py-2">
          <h1 className="text-md font-semibold">Gambar 3 *opsional</h1>
          <Input id={"image"} label={"image"} type="file" register={register} errors={errors} custom={true} customStyle="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none" />
        </div>
        <Input id={"description"} label={"description"} register={register} errors={errors} />
      </div>

      <div className="my-2">
        <h2 className="text-lg font-bold pt-2 pb-1">Variant Produk</h2>
        <div className="py-2">
          <h1 className="text-md font-semibold">Variant 1</h1>
          <div className="flex flex-row gap-2">
            <Input id={"label"} label={"label"} register={register} errors={errors} required />
            <Input id={"price"} label={"price"} register={register} errors={errors} required type={"number"} />
            <Input id={"stock"} label={"stock"} register={register} errors={errors} required type={"number"} />
          </div>
        </div>
        <div className="py-2">
          <h1 className="text-md font-semibold">Variant 2 *opsional</h1>
          <div className="flex flex-row gap-2">
            <Input id={"label"} label={"label"} register={register} errors={errors} required />
            <Input id={"price"} label={"price"} register={register} errors={errors} required type={"number"} />
            <Input id={"stock"} label={"stock"} register={register} errors={errors} required type={"number"} />
          </div>
        </div>
        <div className="py-2">
          <h1 className="text-md font-semibold">Variant 3 *opsional</h1>
          <div className="flex flex-row gap-2">
            <Input id={"label"} label={"label"} register={register} errors={errors} required />
            <Input id={"price"} label={"price"} register={register} errors={errors} required type={"number"} />
            <Input id={"stock"} label={"stock"} register={register} errors={errors} required type={"number"} />
          </div>
        </div>
      </div>

      <Button label={"Tambahkan"} onClick={() => handleSubmit} />
    </div>
  );
}

export default create;