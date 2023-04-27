import ClientError from "@/backend/errors/ClientError";

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

  return {
    data: {
      status: 'error',
      message: 'terjadi kesalahan pada server kami',
    },
    status: 500,
  };
}

export default errorHandler;