export const ResourceKey = {
  // -- API Resources
  Permission: "permission",
  Task: "task",

  // -- Only cache and routes
  AuthUser: "AuthUser",
} as const;
export type ResourceKey = typeof ResourceKey[keyof typeof ResourceKey];
export type ResourceAccessKey = keyof Omit<typeof ResourceKey, "AuthUser">;

export type CacheResourcePageKey<
  T extends ResourceKey,
  Filter extends { include?: any },
> = {
  list: [`${T}`, Filter];
  detail: [`${T}`, { id?: string; include: Filter["include"] }];
};
