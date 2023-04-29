import AuthorizationError from "@/backend/errors/AuthorizationError";

import prisma from "../../libs/prismadb";
import { AccountStatus } from "@prisma/client";

const verifySellerAccess = async (id: string) => {
  const seller = await prisma.seller.findUnique({
    where: {
      userId: id,
    },
    select: {
      verifiedAt: true,
      user: {
        select: {
          status: true,
        },
      },
    },
  });

  if (!seller) {
    throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
  }

  if (!seller.verifiedAt) {
    throw new AuthorizationError("Anda belum diverifikasi");
  }

  if (seller.user.status !== AccountStatus.ACTIVE) {
    throw new AuthorizationError("Akun anda telah dibanned");
  }
}

export default verifySellerAccess;
