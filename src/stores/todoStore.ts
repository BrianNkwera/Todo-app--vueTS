import { defineStore } from "pinia";
import apiClient from "../apiClient";
import {
  TodoType,
  MessageResponseType,
  EditToDoType,
} from "../types/todoInterface";

interface GetAllTodosType {
  entries: {
    key: string;
    value: TodoType;
  }[];
}

export default defineStore("todo", {
  state: () => ({
    todos: [] as TodoType[],
    selectedTodo: null as TodoType | null,
  }),

  actions: {
    async addToDo(toDo: TodoType) {
      const { data, status } = await apiClient<TodoType, MessageResponseType>({
        endpoint: `/${toDo.id}`,
        method: "POST",
        body: toDo,
      });

      if (status !== 201) {
        const error = data as MessageResponseType;

        throw new Error(error.message);
      }

      const addedTodo = data as TodoType;

      this.todos.unshift(addedTodo);
    },

    async deleteTodo(id: string) {
      const { data, status } = await apiClient<
        GetAllTodosType,
        MessageResponseType
      >({
        endpoint: `/${id}`,
        method: "DELETE",
      });

      const responseData = data as MessageResponseType;

      if (status !== 200) throw new Error(responseData.message);

      this.todos = this.todos.filter((todo) => id !== todo.id);
    },

    async getAllTodos() {
      const { data, status } = await apiClient<
        GetAllTodosType,
        MessageResponseType
      >({
        endpoint: `?fields=.`,
        method: "GET",
      });

      if (status == 404) return;

      const response = data as GetAllTodosType;

      this.todos = response.entries.map(entry => entry.value)
    },

    async getSingleTodo(id: string) {
      this.selectedTodo = this.todos.find((todo) => todo.id === id) || null;

      if (this.selectedTodo !== null) return;

      const { data, status } = await apiClient<TodoType, MessageResponseType>({
        endpoint: `/${id}`,
        method: "GET",
      });

      if (status === 200) {
        const toDoFromApi = data as TodoType;
        this.selectedTodo = toDoFromApi;
      }
    },

    async updateTodo(toDo: EditToDoType) {
      //update in db
      const { data, status } = await apiClient<
        EditToDoType,
        MessageResponseType
      >({ endpoint: `/${toDo.id}`, method: "PUT", body: toDo });

      const error = data as MessageResponseType;

      if (status !== 200) throw new Error(error.message);

      const editedToDo = data as TodoType;

      //update in store
      let objIndex = this.todos.findIndex((todo) => todo.id === editedToDo.id);

      this.todos[objIndex] = editedToDo;
    },
  },
});
