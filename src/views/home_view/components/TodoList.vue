<script setup lang="ts">
//imports'
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

//components
import ToDoItem from "./ToDoItem.vue";

//stores
import useTodoStore from "../../../stores/todoStore";
import { TodoType } from "../../../types/todoInterface";

const { todos } = storeToRefs(useTodoStore());
const { getAllTodos } = useTodoStore();

//data
const loadingTodos = ref(true);

//emits
const emit = defineEmits(["editTodo"]);

onMounted(async () => {
  await getAllTodos();
  loadingTodos.value = false;
});

//methods
const deleteTodo = (id: string) => {
  console.log(id);
};

const editTodo = (toDoItem: TodoType) => {
    console.log(toDoItem);
  emit("editTodo", toDoItem);
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
        v-for="todo in todos"
        :id="todo.id"
        :title="todo.title"
        :completed="todo.completed"
        :description="todo.description"
        :created="todo.created"
        :lastUpdated="todo.lastUpdated"
        @deleteTodo="deleteTodo(todo.id)"
        @editTodo="editTodo(todo)"
      />
    </div>
  </div>
</template>

<style scoped></style>
