import AuthorizationError from "@/backend/errors/AuthorizationError";

import prisma from "../../libs/prismadb";

const verifySellerAccess = async (id: string) => {
  const admin = await prisma.seller.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!admin) {
    throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
  }
}

export default verifySellerAccess;
