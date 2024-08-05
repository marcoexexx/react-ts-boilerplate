import { EnhancedButton, EnhancedText } from "@/components/common";
import { withGuard } from "@/components/core";
import { useCreateTodo, useGetTodos } from "@/hooks/todo";
import { Box } from "@mui/material";

const permission: Pick<Permission, "action" | "resource"> = {
  action: "read",
  resource: "todos",
};

export const ListTodo = withGuard((_props) => {
  const { try_data } = useGetTodos({});
  const { mutate } = useCreateTodo();

  const todo_list = try_data.ok_or_throw();

  const handleAdd = () => {
    mutate({
      title: "new todo",
      isCompleted: false,
    });
  };

  return (
    <Box>
      {todo_list?.results.map(todo => (
        <EnhancedText key={todo.id}>
          [ {todo.id} ]. {todo.title}
        </EnhancedText>
      ))}
      <EnhancedButton onClick={handleAdd}>Add new</EnhancedButton>
    </Box>
  );
}, permission);
