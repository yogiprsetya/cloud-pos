export type HttpMeta = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
};

export type HttpRequest<T> = {
  success: boolean;
  meta?: HttpMeta;
  data: T;
};
