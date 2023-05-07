import ClientError from "@/backend/errors/ClientError";
import { Prisma } from "@prisma/client";

const errorHandler = (error: any) => {
  if (error instanceof ClientError) {
    return {
      data: {
        status: 'fail',
        message: error.message,
      },
      status: error.statusCode,
    };
  }

  console.log(error);

  if (error instanceof Prisma.PrismaClientKnownRequestError || error instanceof Prisma.PrismaClientUnknownRequestError) {
    return {
      data: {
        status: 'error',
        message: 'Database service unavailable',
      },
      status: 503,
    }
  }

  return {
    data: {
      status: 'error',
      message: 'Terjadi kesalahan pada server kami',
    },
    status: 500,
  };
}

export default errorHandler;