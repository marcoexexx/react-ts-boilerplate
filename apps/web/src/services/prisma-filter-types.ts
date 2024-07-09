export type NumberFilter = {
  equals?: number;
  not?: number;
  in?: number[];
  notIn?: number[];
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
} | number;

export type StringFilter = {
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

export type BooleanFilter = {
  equals?: boolean;
  not?: boolean;
} | boolean;

export type DateTimeFilter =
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

export type RelationshipFilter<T> = {
  is?: T;
  isNot?: T;
};

export type WhereInput<T> = {
  [K in keyof T]?: T[K] extends number ? NumberFilter
    : T[K] extends string ? StringFilter
    : T[K] extends boolean ? BooleanFilter
    : T[K] extends Date ? DateTimeFilter
    : T[K] extends object ? RelationshipFilter<T[K]>
    : never;
};
