type Pagination = {
  page: number;
  pageSize: number;
};

type QueryOptionArgs = {
  queryKey: any;
  signal: AbortSignal;
  meta: Record<string, unknown> | undefined;
};

// TODO: implement for app filter type. example, prisma where type.
type WhereInput<T> = import("./prisma-filter-types").WhereInput<T>;

type BasePayload = {
  id: string;
  updatedAt: string | Date;
  createdAt: string | Date;
};

type CreatePayload<T extends BasePayload> = Omit<T, keyof BasePayload>;
type UpdatePayload<T extends BasePayload> = Partial<
  Omit<T, keyof BasePayload>
>;

type FilterPayload<T extends BasePayload> = {
  where?: WhereInput<T>;
  pagination?: Pagination;
  include?: any;
};

type HttpResponse = {
  status: number;
  error?: string | string[];
  message: string;
};

type HttpListResponse<T> = {
  status: number;
  results: Array<T>;
  count: number;
  error?: string | string[];
};

type HttpDetailResponse<T, L extends string> =
  & Omit<HttpResponse, "message">
  & { [K in L]: T };
