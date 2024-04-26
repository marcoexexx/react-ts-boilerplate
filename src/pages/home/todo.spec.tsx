import { Providers } from "@/components/core";
import { useGetTodos } from "@/hooks/todo";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import HomePage from ".";
import { ListTodo } from "./todo";

describe("App", () => {
  it("should defined `home` page", () => {
    render(
      <Providers>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Providers>,
    );
    expect(screen.getByText("Todo")).toEqual;
  });

  it("should add new todo", () => {
    function AddNewTodo() {
      const { data } = useGetTodos({});

      return (
        <>
          <p data-testid="latest-todo">
            {data?.results.length
              ? data?.results?.slice(-1)?.[0].id
              : "No"}
          </p>
          <ListTodo />
        </>
      );
    }

    render(
      <Providers>
        <MemoryRouter>
          <AddNewTodo />
        </MemoryRouter>
      </Providers>,
    );

    const latestTodo = screen.getByTestId("latest-todo");
    const addBtn = screen.getByText("Add new");

    screen.debug();

    expect(screen.getByText("Add new")).toBeDefined();

    fireEvent.click(addBtn);
    expect(latestTodo.textContent).toBe("1");
  });
});
