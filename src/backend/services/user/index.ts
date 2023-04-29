import AuthorizationError from "@/backend/errors/AuthorizationError";

import prisma from "../../libs/prismadb";
import { AccountStatus } from "@prisma/client";

const verifyUserAccess = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      status: true,
    },
  });

  if (!user) {
    throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
  }

  if (user?.status !== AccountStatus.ACTIVE) {
    throw new AuthorizationError("Akun anda telah dibanned");
  }
}

export default verifyUserAccess;
