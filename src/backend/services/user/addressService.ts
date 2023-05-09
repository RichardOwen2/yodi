import { nanoid } from "nanoid";

import NotFoundError from "@/backend/errors/NotFoundError";
import InvariantError from "@/backend/errors/InvariantError";
import AuthorizationError from "@/backend/errors/AuthorizationError";

import prisma from "@/backend/libs/prismadb";

interface addAddressParams {
  label: string;
  city: string;
  address: string;
  note: string;
}

interface editAddressParams {
  addressId: string;
  label: string;
  city: string;
  address: string;
  note: string;
}

const _verifyAddressAccess = async (userId: string, addressId: string) => {
  const userAddress = await prisma.userAddress.findUnique({
    where: {
      id: addressId,
    },
    select: {
      userId: true,
    },
  });

  if (!userAddress) {
    throw new NotFoundError("Address tidak ditemukan");
  }

  if (userAddress.userId === userId) {
    throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
  }
}

export const addAddress = async (userId: string, { label, city, address, note = "" }: addAddressParams) => {
  const id = `address-${nanoid(16)}`;

  const userAddress = await prisma.userAddress.create({
    data: {
      id,
      userId,
      label,
      city,
      address,
      note,
    },
    select: {
      id: true,
    },
  });

  if (!userAddress) {
    throw new InvariantError("Gagal menambahkan address");
  }
}

export const getAddress = async (userId: string) => {
  const address = await prisma.userAddress.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      label: true,
      city: true,
      address: true,
      note: true,
    },
  });

  return address;
}

export const editAddress = async (userId: string, { addressId, label, city, address, note }: editAddressParams) => {
  await _verifyAddressAccess(userId, addressId);

  const data = Object.assign({},
    label && { label },
    city && { city },
    address && { address },
    note && { note },
  );

  const verify = await prisma.userAddress.update({
    where: {
      id: addressId,
    },
    data,
    select: {
      id: true,
    },
  });

  if (!verify) {
    throw new InvariantError("Gagal melakukan update address");
  }
}

export const deleteAddress = async (userId: string, addressId: string) => {
  await _verifyAddressAccess(userId, addressId);

  const verify = await prisma.userAddress.delete({
    where: {
      id: addressId,
    },
  });

  if (!verify) {
    throw new InvariantError("Gagal menghapus address");
  }
}

export const getAddressById = async (userId: string, { addressId }: { addressId: string }) => {
  await _verifyAddressAccess(userId, addressId);

  const address = await prisma.userAddress.findUnique({
    where: {
      id: addressId,
    },
    select: {
      label: true,
      city: true,
      address: true,
      note: true,
    },
  });

  if (!address) {
    throw new NotFoundError("Address tidak ditemukan");
  }

  return address;
}