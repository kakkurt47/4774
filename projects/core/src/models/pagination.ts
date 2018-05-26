export type InfPaginationResult<T> = {
  list: T[],
  after: string,
  before: string
};

export type PaginationResult<T> = {
  list: T[],
  page: Pagination[],
  total?: number
};

export type Pagination = {
  current: boolean;
  num: number;
  text: string;
};
