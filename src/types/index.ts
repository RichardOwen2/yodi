export enum UserRole {
  USER = 0,
  SELLER = 1,
  ADMIN = 2,
}

export interface PaginationParams {
  page: number;
  itemCount: number;
}