import { useCreateTodo, useGetTodos } from "@/hooks/todo";

export const ListTodo = () => {
  const { data } = useGetTodos({});
  const { mutate } = useCreateTodo();

  const handleAdd = () => {
    mutate({
      title: "new todo",
      isCompleted: false
    })
  }

  return (
    <div>
      {data?.results.map(todo => <p key={todo.id}>{todo.title}</p>)}
      <button onClick={handleAdd}>Add new</button>
    </div>
  );
};


