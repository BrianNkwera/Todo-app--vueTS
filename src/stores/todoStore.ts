import { defineStore } from "pinia";
import apiClient from "../apiClient";
import type {
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

      this.todos.push({...toDo});

      console.log(this.todos)

      console.log(toDo)
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

      this.todos = response.entries.map((entry) => entry.value);
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

    async updateTodo(toDo: TodoType) {
      //update in db
      const { data, status } = await apiClient<
        EditToDoType,
        MessageResponseType
      >({ endpoint: `/${toDo.id}`, method: "PUT", body: toDo });

      const error = data as MessageResponseType;

      if (status !== 200) throw new Error(error.message);

      //update in store
      let objIndex = this.todos.findIndex((todo) => todo.id === toDo.id);


      this.todos[objIndex] = toDo;

    },
  },
  getters: {
    getCompletedTasks(state) {
        return state.todos.filter((todo) => todo.completed)
    }
  }
});
