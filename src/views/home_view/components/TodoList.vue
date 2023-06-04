<script setup lang="ts">
//imports
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

//components
import ToDoItem from "./ToDoItem.vue";

//stores
import useTodoStore from "../../../stores/todoStore";

const { todos } = storeToRefs(useTodoStore());
const { getAllTodos } = useTodoStore();

onMounted(async () => {
  await getAllTodos();
});
</script>

<template>
  <div v-if="todos.length === 0" class="my-5">
    <h3>List Empty</h3>
  </div>
  <div v-else>
    <ToDoItem
      :key="todo.id"
      v-for="todo in todos"
      :id="todo.id"
      :title="todo.title"
      :completed="todo.completed"
      :description="todo.description"
      :created="todo.created"
      :lastUpdated="todo.lastUpdated"
    />
  </div>
</template>

<style scoped></style>
