import { defineStore } from "pinia";
import apiClient from "../apiClient";
import { TodoType, ErrorResponseType } from "../tpyes/todoInterface";

export default defineStore("todo", {
  state: () => ({
    todos: [] as TodoType[],
  }),

  actions: {
    async addToDo(toDo: TodoType) {
      const { data, status } = await apiClient<TodoType, ErrorResponseType>({
        endpoint: `/${toDo.id}`,
        method: "POST",
        body: toDo,
      });

      if (status !== 201) {
        const error = data as ErrorResponseType;

        throw new Error(error.message);
      }

      const addedTodo = data as TodoType;

      this.todos.unshift(addedTodo);
    },

    async deleteTodo(id: string) {
      const { data, status } = await apiClient({
        endpoint: ``
      }`/category/${id}`, "DELETE");

      if (status !== 200) throw new Error(data.info);

      this.categories = this.categories.filter(
        (category) => id !== category._id
      );
    },
    async getAllCategories(orderBy) {
      if (this.categories.length !== 0) return;

      const { data, status } = await apiClient(
        `/categories?orderBy=${orderBy}`,
        "get"
      );

      if (status !== 200) throw new Error(data.info);

      this.categories = data;
    },
    async editCategory(editedCategory) {
      const body = { name: editedCategory.name, SKU: editedCategory.SKU };

      //update in db
      const { data, status } = await apiClient(
        `/category/${editedCategory._id}`,
        "PATCH",
        JSON.stringify(body)
      );

      if (status !== 200) throw new Error(data.info);

      //update in store
      let objIndex = this.categories.findIndex(
        (category) => category._id === editedCategory._id
      );
      this.categories[objIndex] = data.category;
    },
  },
});
