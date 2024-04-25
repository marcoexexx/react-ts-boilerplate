type Pagination = {
  page: number;
  pageSize: number;
};

type QueryOptionArgs = {
  queryKey: any;
  signal: AbortSignal;
  meta: Record<string, unknown> | undefined;
};

type NumberFilter = {
  equals?: number;
  not?: number;
  in?: number[];
  notIn?: number[];
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
} | number;

type StringFilter = {
  equals?: string;
  not?: string;
  in?: string[];
  notIn?: string[];
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  mode?: "insensitive" | "default";
} | string;

type BooleanFilter = {
  equals?: boolean;
  not?: boolean;
} | boolean;

type DateTimeFilter =
  | {
    equals?: Date;
    not?: Date;
    in?: Date[];
    notIn?: Date[];
    lt?: Date;
    lte?: Date;
    gt?: Date;
    gte?: Date;
  }
  | Date
  | string;

type RelationshipFilter<T> = {
  is?: T;
  isNot?: T;
};

type WhereInput<T> = {
  [K in keyof T]?: T[K] extends number ? NumberFilter
    : T[K] extends string ? StringFilter
    : T[K] extends boolean ? BooleanFilter
    : T[K] extends Date ? DateTimeFilter
    : T[K] extends object ? RelationshipFilter<T[K]>
    : never;
};

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
