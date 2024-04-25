import { ErrorBoundary } from "@/components/core";
import { Suspense } from "react";
import { ListTodo } from "./todo";

interface HomePageProps {}

export default function HomePage(props: HomePageProps) {
  const {} = props;

  return (
    <div>
      Todo
      <ErrorBoundary>
        <Suspense fallback={"loading..."}>
          <ListTodo />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
