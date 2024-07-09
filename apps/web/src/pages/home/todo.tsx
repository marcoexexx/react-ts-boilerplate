import { EnhancedButton, EnhancedText } from "@/components/common";
import { useCreateTodo, useGetTodos } from "@/hooks/todo";
import { Box } from "@mui/material";

export const ListTodo = () => {
  const { data } = useGetTodos({});
  const { mutate } = useCreateTodo();

  const handleAdd = () => {
    mutate({
      title: "new todo",
      isCompleted: false,
    });
  };

  return (
    <Box>
      {data?.results.map(todo => (
        <EnhancedText key={todo.id}>
          [ {todo.id} ]. {todo.title}
        </EnhancedText>
      ))}
      <EnhancedButton onClick={handleAdd}>Add new</EnhancedButton>
    </Box>
  );
};
