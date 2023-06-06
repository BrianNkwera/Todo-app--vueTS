<script lang="ts" setup>
//imports
import { ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { TodoType } from "../../types/todoInterface";
import Fuse from "fuse.js";

//components
import ToDoForm from "./components/ToDoForm.vue";
import TabsComponent from "../../shared/TabsComponent.vue";
import TodoList from "./components/TodoList.vue";
import ConfirmationModal from "../../shared/ConfirmationModal.vue";
import SearchForm from "./components/SearchForm.vue";

//stores
import useTodoStore from "../../stores/todoStore";
import useNotificationStore from "../../stores/notificationStore";

const { todos } = storeToRefs(useTodoStore());
const { getAllTodos, deleteTodo } = useTodoStore();
const { showNotification } = useNotificationStore();

//data
const activeTab = ref<"All Tasks" | "In Progress" | "Completed">("All Tasks");
const loadingDelete = ref(false);
const loadingTodos = ref(true);
const isCreateTodoForm = ref(true);
const toDoFormModalDisplayed = ref(false);
const selectedToDoItem = ref<TodoType | null>(null);
const showLargeSearchBar = ref(false);
const displayedTodos = ref<TodoType[]>([]);
const deletedTodo = ref("");
const confirmationModalOpened = ref(false);
const searching = ref(false);

//computed data
const allTodos = computed<TodoType[]>(() => [...todos.value].reverse());
const completedTodos = computed<TodoType[]>(() =>
  [...todos.value.filter((todo) => todo.completed === true)].reverse()
);
const inProgressTodos = computed<TodoType[]>(() =>
  [...todos.value.filter((todo) => todo.completed === false)].reverse()
);

//hooks
onMounted(async () => {
  await getAllTodos();
  loadingTodos.value = false;
});

//methods
const filterTodos = (tab: "All Tasks" | "In Progress" | "Completed") => {
  searching.value = false;
  activeTab.value = tab;
};

const openCreateTodoModal = () => {
  selectedToDoItem.value = null;
  isCreateTodoForm.value = true;
  toDoFormModalDisplayed.value = true;

  setTimeout(() => {
    const categoryModal = document.getElementById("createTodoModal");
    //@ts-ignore
    const modal = new bootstrap.Modal(categoryModal);
    modal?.show();
  }, 200);
};

const openEditTodoModal = (toDoItem: TodoType) => {
  selectedToDoItem.value = toDoItem;
  isCreateTodoForm.value = false;
  toDoFormModalDisplayed.value = true;

  setTimeout(() => {
    const categoryModal = document.getElementById("createTodoModal");
    //@ts-ignore
    const modal = new bootstrap.Modal(categoryModal);
    modal?.show();
  }, 200);
};

const onDeleteTodo = async () => {
  try {
    loadingDelete.value = true;
    await deleteTodo(deletedTodo.value);
  } catch (error: any) {
    error.name = "";
    showNotification({
      title: "Failed to delete item",
      details: error,
      isSuccess: false,
    });
  } finally {
    loadingDelete.value = false;
    const modal = document.getElementById("confirmModal");
    if (!modal) return;
    //@ts-ignore
    const categoryModal = bootstrap.Modal.getInstance(modal);
    categoryModal?.hide();
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

const searchTasks = (searchQuery: string) => {
  if (searchQuery === "") {
    searching.value = false;
    displayedTodos.value = [...todos.value].reverse();
    return;
  }

  searching.value = true;

  const options = {
    keys: ["title", "description"],
  };

  const fuse = new Fuse(todos.value, options);

  const results = fuse.search(searchQuery);

  displayedTodos.value = results.map((result) => result.item);
};
</script>

<template>
  <div id="homeView" class="container py-5">
    <div class="sticky-top z-200 bg-white pb-3">
      <div class="mb-4">
        <div>
          <h3 class="text-center">To Do</h3>
        </div>
      </div>

      <div class="d-flex justify-content-between pb-3">
        <TabsComponent
          v-if="!showLargeSearchBar"
          :tabs="['All Tasks', 'In Progress', 'Completed']"
          :numberOfInProgressTasks="inProgressTodos.length"
          :numberOfAlltasks="allTodos.length"
          :numberOfCompletedTasks="completedTodos.length"
          @onSelected="filterTodos($event)"
        />

        <div v-else class="d-flex align-items-center">
          <font-awesome-icon
            @click="showLargeSearchBar = false"
            icon="fa-solid fa-arrow-left"
            class="text-primary fw-bolder fs-3"
          />
        </div>

        <div class="d-none d-md-flex">
          <SearchForm @search="searchTasks($event)" />
        </div>
        <div class="d-md-none d-flex align-items-center">
          <SearchForm v-if="showLargeSearchBar" @search="searchTasks($event)" />
          <font-awesome-icon
            v-else
            @click="showLargeSearchBar = true"
            icon="fa-solid fa-magnifying-glass"
            class="text-primary"
          />
        </div>
      </div>
    </div>

    <div class="todos">
      <TodoList
        @editTodo="openEditTodoModal($event)"
        @onDeleteTodo="openConfirmationModal($event)"
        :todos="
          searching
            ? displayedTodos
            : activeTab === 'Completed'
            ? completedTodos
            : activeTab === 'In Progress'
            ? inProgressTodos
            : allTodos
        "
        :loadingTodos="loadingTodos"
      />
    </div>

    <button
      class="float bg-primary text-white btn fw-bolder"
      target="_blank"
      @click="openCreateTodoModal"
    >
      +
    </button>
  </div>
  <ToDoForm
    v-if="toDoFormModalDisplayed"
    :isCreateTodoForm="isCreateTodoForm"
    :toDoItem="selectedToDoItem"
    @onCloseModal="toDoFormModalDisplayed = false"
  />
  <ConfirmationModal
    v-if="confirmationModalOpened"
    placeholder="Are you sure you want to delete todo item?"
  >
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

<style scoped>
#homeView {
  max-width: 800px !important;
}

@media only screen and (min-width: 720px) {
  .todos::-webkit-scrollbar {
    width: 0.6em;
  }

  .todos::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 100vw;
  }

  .todos::-webkit-scrollbar-track {
    background: var(--light);
    border-radius: 100vw;
    margin-block: 0.3em;
  }
}

.todos {
  max-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
}

.float {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  border-radius: 50px;
  text-align: center;
  font-size: 30px;
  box-shadow: 2px 2px 3px #999;
  z-index: 100;
}

.my-float {
  margin-top: 16px;
}
</style>
