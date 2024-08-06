export const ResourceKey = {
  // -- API Resources
  Permission: "permission",

  // -- Only cache and routes
  UserPermission: "user-permission",
  Task: "task",
} as const;
export type ResourceKey = typeof ResourceKey[keyof typeof ResourceKey];
export type ResourceAccessKey = keyof Omit<typeof ResourceKey, "UserPermission">;

export type CacheResourcePageKey<
  T extends ResourceKey,
  Filter extends { include?: any },
> = {
  list: [`${T}`, Filter];
  detail: [`${T}`, { id?: string; include: Filter["include"] }];
};
