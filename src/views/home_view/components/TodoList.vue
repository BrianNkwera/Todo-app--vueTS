<script setup lang="ts">
//imports'
import { storeToRefs } from "pinia";

//components
import ToDoItem from "./ToDoItem.vue";

//stores
import useTodoStore from "../../../stores/todoStore";
import { TodoType } from "../../../types/todoInterface";

const { todos } = storeToRefs(useTodoStore());
const { updateTodo } = useTodoStore();

//props
const props = defineProps<{
  todos: TodoType[];
  loadingTodos: boolean;
}>();

//emits
const emit = defineEmits(["editTodo", "deleteTodo"]);

//methods
const checkedCompleted = (todo: TodoType) => {
  const todoToUpdate = { ...todo };

  todoToUpdate.completed = !todoToUpdate.completed;

  updateTodo(todoToUpdate);
};

const editTodo = (toDoItem: TodoType) => {
  emit("editTodo", toDoItem);
};

const onDeleteTodo = (id: string) => {
  emit("deleteTodo", id);
};
</script>

<template>
  <div v-if="loadingTodos" class="d-flex align-items-center my-5">
    <div class="spinner-border mx-auto" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else>
    <div v-if="todos.length === 0" class="my-5">
      <h3>List Empty</h3>
    </div>
    <div v-else>
      <ToDoItem
        class="mb-3"
        :key="todo.id"
        v-for="todo in props.todos"
        :id="todo.id"
        :title="todo.title"
        :completed="todo.completed"
        :description="todo.description"
        :created="todo.created"
        :lastUpdated="todo.lastUpdated"
        @checkedCompleted="checkedCompleted(todo)"
        @deleteTodo="onDeleteTodo(todo.id)"
        @editTodo="editTodo(todo)"
      />
    </div>
  </div>
</template>

<style scoped></style>
