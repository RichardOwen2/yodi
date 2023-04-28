import AuthorizationError from "@/backend/errors/AuthorizationError";

import prisma from "../../libs/prismadb";

const verifySellerAccess = async (id: string) => {
  const seller = await prisma.seller.findUnique({
    where: {
      userId: id,
    },
    select: {
      verifiedAt: true,
    },
  });

  if (!seller) {
    throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
  }

  if (!seller.verifiedAt) {
    throw new AuthorizationError("Anda belum diverifikasi");
  }
}

export default verifySellerAccess;
