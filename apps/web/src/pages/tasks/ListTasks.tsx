import { EnhancedText } from "@/components/common";
import { withGuard } from "@/components/core";
import { PermissionAction, PermissionResource } from "@/context/permission";

const permission: CheckPermissionInput = {
  action: PermissionAction.Read,
  resource: PermissionResource.Task,
};

interface ListTasksProps {}

// TODO: Need handle permission
const ListTasks = withGuard<ListTasksProps>((props) => {
  return (
    <div>
      <EnhancedText>
        LIST READ {props.allowed ? "ALLOWED" : "DENIED"}
      </EnhancedText>
    </div>
  );
}, permission);

export default ListTasks;
