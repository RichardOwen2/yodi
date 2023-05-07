import { nanoid } from "nanoid"

import InvariantError from "@/backend/errors/InvariantError";
import NotFoundError from "@/backend/errors/NotFoundError";

import prisma from "@/backend/libs/prismadb";

interface addShipperParams {
  name: string;
  price: number;
  city: string;
}

interface editShipperParams {
  id: string;
  name: string;
  price: number;
  city: string;
}

const _checkIfShipperExist = async (id: string) => {
  const shipper = await prisma.shipper.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!shipper) {
    throw new NotFoundError("Shipper tidak ditemukan");
  }
}

export const addShipper = async ({ name, price, city }: addShipperParams) => {
  const id = `shipper-${nanoid(16)}`;

  const shipper = await prisma.shipper.create({
    data: {
      id,
      name,
      price,
      city,
    },
    select: {
      id: true,
    },
  });

  if (!shipper) {
    throw new InvariantError("Gagal menambahkan shipper");
  }
}

export const editShipper = async ({ id, name, price, city }: editShipperParams) => {
  await _checkIfShipperExist(id);

  const data = Object.assign({},
    name && { name },
    price && { price },
    city && { city },
  );

  const shipper = await prisma.shipper.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
    },
  });

  if (!shipper) {
    throw new InvariantError("Gagal melakukan update shipper");
  }
}

export const deleteShipper = async ({ id }: { id: string }) => {
  await _checkIfShipperExist(id);

  const shipper = await prisma.shipper.delete({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!shipper) {
    throw new InvariantError("Gagal menghapus shipper");
  }
}