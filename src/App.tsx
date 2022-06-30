import { FormEvent, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Todo } from "./components/Todo";
import { api } from "./lib/api";

import styles from "./style.module.css";

interface TodoItem {
  id: number;
  name: string;
  isCompleted: number;
}

export function App() {
  const [todo, setTodo] = useState<TodoItem[]>([]);
  const [todoName, setTodoName] = useState("");
  const [refreshKey, setRefreshKey] = useState(false);

  async function handleAddNewTodo(event: FormEvent) {
    event.preventDefault();

    await api.post("/todo", {
      name: todoName,
    });

    setTodoName("");
    setRefreshKey(true);
  }

  async function handleRemoveTodo(id: number) {
    await api.delete(`/todo/${id}`);
    setRefreshKey(true);
  }

  useEffect(() => {
    async function getTodos() {
      const { data } = await api.get<TodoItem[]>("/todo");
      setTodo(data);
    }

    getTodos();
    setRefreshKey(false);
  }, [refreshKey]);

  return (
    <>
      <Header />
      <form
        onSubmit={handleAddNewTodo}
        className={styles.todoForm}
      >
        <div className={styles.inputField}>
          <label htmlFor="todo">
            Adicione uma nova tarefa
          </label>
          <input
            type="text"
            id="todo"
            onChange={event => setTodoName(event.target.value)}
            value={todoName}
          />
        </div>
        <button>
          Adicionar
        </button>
      </form>
      <ul className={styles.todoContainer}>
        {todo.map(todo => (
          <Todo
            key={todo.id}
            name={todo.name}
            id={todo.id}
            handleRemoveTodo={handleRemoveTodo}
          />
        ))}
      </ul>
    </>
  )
}
