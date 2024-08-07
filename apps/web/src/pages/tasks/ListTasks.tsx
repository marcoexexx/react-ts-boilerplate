import { withGuard } from "@/components/core";
import { PermissionAction, PermissionResource } from "@/context/permission";

const permission: CheckPermissionInput = {
  action: PermissionAction.Read,
  resource: PermissionResource.Task,
};

interface ListTasksProps {}

const ListTasks = withGuard<ListTasksProps>(permission, (props) => {
  return (
    <div>
      Ok: {props.allowed ? "ALLOWED" : "NOT"}
    </div>
  );
}, true);

export default ListTasks;
