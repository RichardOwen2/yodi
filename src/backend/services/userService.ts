import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

import InvariantError from "@/backend/errors/InvariantError";
import AuthenticationError from "@/backend/errors/AuthenticationError";
import NotFoundError from "@/backend/errors/NotFoundError";

import { UserRole } from "@/types/index"
import prisma from "../libs/prismadb";

interface addUserParams {
  username: string;
  email: string;
  password: string;
}

interface verifyUserCrendentialParams {
  email: string;
  password: string;
}

const _verifyNewUsernameAndEmail = async (username: string, email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username },
        { email }
      ]
    },
  });

  if (user?.username === username) {
    throw new InvariantError("Username sudah digunakan");
  }

  if (user?.email === email) {
    throw new InvariantError("Email sudah digunakan");
  }
}

const _checkIfUserExistById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new InvariantError("User tidak ditemukan");
  }
}

export const addUser = async ({ username, email, password }: addUserParams) => {
  await _verifyNewUsernameAndEmail(username, email);

  const id = `user-${nanoid(16)}`
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      id,
      username,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
    }
  });

  if (!user) {
    throw new InvariantError("User gagal ditambahkan");
  }

  return user.id;
}

export const verifyUserCrendential = async ({ email, password }: verifyUserCrendentialParams) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AuthenticationError("Kredensial yang Anda berikan salah");
  }

  const { id, password: hashedPassword } = user;

  const isMatch = await bcrypt.compare(password, hashedPassword);

  if (!isMatch) {
    throw new AuthenticationError("Kredensial yang Anda berikan salah");
  }

  return id;
}

export const getUserRoleById = async (id: string): Promise<UserRole> => {
  await _checkIfUserExistById(id);

  const admin = await prisma.admin.findUnique({
    where: {
      userId: id
    },
  });

  if (admin) {
    return UserRole.ADMIN;
  }

  const seller = await prisma.seller.findUnique({
    where: {
      userId: id
    },
  });

  if (seller) {
    return UserRole.SELLER;
  };

  return UserRole.USER;
};

export const getUserProfileById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      username: true,
      status: true,
      email: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  if (!user) {
    throw new NotFoundError("User tidak ditemukan");
  }

  return user;
};

export const changeUserProfileById = async ({}) => {
  
}

export const addUserPhotoProfileById = async ({ id, fileUrl }: { id: string; fileUrl: string; }) => {
  await _checkIfUserExistById(id);

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      image: fileUrl,
    },
    select: {
      image: true,
    },
  });

  if (!user) {
    throw new InvariantError("Gagal menambahkan photo profile");
  }

  return user;
}

export const upgradeRoleSellerById = async (userId: string) => {
  const userRole = await getUserRoleById(userId);

  if (userRole === UserRole.SELLER) {
    throw new InvariantError("Anda sudah melakukan pengajuan seller")
  } else if (userRole !== UserRole.USER) {
    throw new InvariantError("Role akun bukan user!")
  }

  const id = `seller-${nanoid(16)}`;

  const seller = await prisma.seller.create({
    data: {
      id,
      userId,
    },
    select: {
      id: true,
    },
  });

  if (!seller) {
    throw new InvariantError("Gagal melakukan upgrade role");
  };

  return id;
}
