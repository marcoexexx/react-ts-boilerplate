export const ResourceKey = {
  Todo: "todos",
  Permission: "permissions",
} as const;
export type ResourceKey = typeof ResourceKey[keyof typeof ResourceKey];

export type CacheResourcePageKey<
  T extends ResourceKey,
  Filter extends { include?: any },
> = {
  list: [
    `${T}`,
    Filter,
  ];
  detail: [`${T}`, { id?: string; include: Filter["include"] }];
};
