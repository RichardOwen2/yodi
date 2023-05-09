import NotFoundError from "@/backend/errors/NotFoundError";
import InvariantError from "@/backend/errors/InvariantError";

import prisma from "@/backend/libs/prismadb"

interface editUserProfileParams {
  username?: string;
  image?: string;
  phoneNumber?: string;
  password?: string;
}

const _verifyNewUsername = async (userId: string, username: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  if (user) {
    if (user.id !== userId) {
      throw new InvariantError("Username sudah digunakan");
    }
  }
}

export const editUserProfile = async (userId: string, {
  username,
  image,
  phoneNumber
}: editUserProfileParams) => {
  const data = Object.assign({},
    username && { username },
    image && { image },
    phoneNumber && { phoneNumber },
  );

  if (username) {
    await _verifyNewUsername(userId, username);
  }

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data,
    select: {
      id: true,
    },
  });

  if (!user) {
    throw new InvariantError("Gagal melakukan update");
  }

  return data;
}

export const checkUserPhoneNumber = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      phoneNumber: true,
    },
  });

  if (!user) {
    throw new NotFoundError("User tidak ditemukan");
  }

  if (!user.phoneNumber) {
    throw new InvariantError("Tambahkan Nomor telephone sebelum melanjutkan!")
  }
}
