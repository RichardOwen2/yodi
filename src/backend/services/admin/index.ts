import AuthorizationError from "@/backend/errors/AuthorizationError";

import prisma from "../../libs/prismadb";

const verifyAdminAccess = async (id: string) => {
  const admin = await prisma.admin.findUnique({
    where: {
      userId: id,
    },
    select: {
      id: true,
    },
  });

  if (!admin) {
    throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
  }
}

export default verifyAdminAccess;
