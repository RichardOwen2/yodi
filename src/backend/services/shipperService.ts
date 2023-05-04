import NotFoundError from "../errors/NotFoundError";

import prisma from "../libs/prismadb";

export const getShippers = async () => {
  const shippers = await prisma.shipper.findMany({
    select: {
      name: true,
      price: true,
      city: true,
    },
  });

  return shippers;
}

export const getShipperById = async (id: string) => {
  const shipper = await prisma.shipper.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      price: true,
      city: true,
    },
  });

  if (!shipper) {
    throw new NotFoundError("Shipper tidak ditemukan");
  }

  return shipper;
}