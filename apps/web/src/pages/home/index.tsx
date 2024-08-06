import { withGuard } from "@/components/core";

/// TODO: REMOVE
const perm: CheckPermissionInput = { action: "Create", resource: "Task" };

const NeedPermissino = withGuard(perm, () => {
  return <h1>Ok</h1>;
});

export default function Home() {
  return (
    <div>
      Home landing page <NeedPermissino />
    </div>
  );
}
