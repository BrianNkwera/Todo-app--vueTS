<script setup lang="ts">
//imports'
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

//components
import ToDoItem from "./ToDoItem.vue";

//stores
import useTodoStore from "../../../stores/todoStore";
import { TodoType } from "../../../types/todoInterface";
import ConfirmationModal from "./ConfirmationModal.vue";

const { todos } = storeToRefs(useTodoStore());
const { getAllTodos, updateTodo, deleteTodo } = useTodoStore();

//data
const loadingTodos = ref(true);
const loadingDelete = ref(false);
const deletedTodo = ref("");
const displayedTodos = ref<TodoType[]>([]);
const confirmationModalOpened = ref(false);

//emits
const emit = defineEmits(["editTodo"]);

onMounted(async () => {
  await getAllTodos();
  loadingTodos.value = false;
  displayedTodos.value = todos.value;
});

//methods
const checkedCompleted = (todo: TodoType) => {
  const todoToUpdate = { ...todo };

  todoToUpdate.completed = !todoToUpdate.completed;

  updateTodo(todoToUpdate);
};

const editTodo = (toDoItem: TodoType) => {
  emit("editTodo", toDoItem);
};

const onDeleteTodo = async () => {
  try {
    loadingDelete.value = true;
    await deleteTodo(deletedTodo.value);

    const modal = document.getElementById("confirmModal");
    if (!modal) return;
    //@ts-ignore
    const categoryModal = bootstrap.Modal.getInstance(modal);
    categoryModal?.hide();
  } catch (error) {
    console.log(error);
  } finally {
    loadingDelete.value = false;
  }
};

const openConfirmationModal = async (id: string) => {
  deletedTodo.value = id;
  confirmationModalOpened.value = true;

  setTimeout(() => {
    const confirmModal = document.getElementById("confirmModal");
    //@ts-ignore
    const modal = new bootstrap.Modal(confirmModal);
    modal?.show();
  }, 200);
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
        v-for="todo in displayedTodos"
        :id="todo.id"
        :title="todo.title"
        :completed="todo.completed"
        :description="todo.description"
        :created="todo.created"
        :lastUpdated="todo.lastUpdated"
        @checkedCompleted="checkedCompleted(todo)"
        @deleteTodo="openConfirmationModal(todo.id)"
        @editTodo="editTodo(todo)"
      />
    </div>
  </div>
  <ConfirmationModal placeholder="Are you sure you want to delete todo item?">
    <button
      style="width: 70px"
      @click="onDeleteTodo"
      class="btn bg-secondary text-white"
      type="button"
    >
      <div v-if="loadingDelete" class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <span v-else>Delete</span>
    </button>
  </ConfirmationModal>
</template>

<style scoped></style>
