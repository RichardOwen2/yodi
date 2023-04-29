import { validateNumberParams } from "../validators/numberParamsValidator";

const getPaginationParams = (searchParams: URLSearchParams) => {
  validateNumberParams(searchParams.get("page"));
  validateNumberParams(searchParams.get("itemCount"));

  const page = searchParams.get("page") !== null ? parseInt(searchParams.get("page") as string) : 1;
  const itemCount = searchParams.get("itemCount") !== null ? parseInt(searchParams.get("itemCount") as string) : 5;

  return { page, itemCount };
}

export default getPaginationParams;