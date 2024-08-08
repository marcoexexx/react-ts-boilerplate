interface Role {
  id: string;
  name: string;

  description: string;
  permissions: Pick<Permission, "action" | "resource">[];

  createdAt: string;
  updatedAt: string;
}
