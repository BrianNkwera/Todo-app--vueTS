<script lang="ts" setup>
//imports
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

//components
import ToDoForm from "./components/ToDoForm.vue";
import TabsComponent from "../../shared/TabsComponent.vue";
import TodoList from "./components/TodoList.vue";
import { TodoType } from "../../types/todoInterface";

//stores
import useTodoStore from "../../stores/todoStore";

const { todos } = storeToRefs(useTodoStore());
const { getAllTodos } = useTodoStore();

//data
const loadingTodos = ref(true);
const isCreateTodoForm = ref(true);
const toDoFormModalDisplayed = ref(false);
const selectedToDoItem = ref<TodoType | null>(null);
const displayedTodos = ref<TodoType[]>([]);

//hooks
onMounted(async () => {
    await getAllTodos();
    loadingTodos.value = false;
    displayedTodos.value = todos.value;
});

//methods
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
</script>

<template>
    <div id="homeView" class="container py-5 px-md-2">
        <div class="sticky-top z-200 bg-white pb-3">
            <div class="d-flex justify-content-between mb-4">
                <div>
                    <h3>To Do</h3>
                </div>
            </div>

            <TabsComponent :tabs="['All Tasks', 'Completed']" />
        </div>

        <div class="todos pe-md-4">
            <TodoList  @editTodo="openEditTodoModal($event)" :todos="displayedTodos" :loadingTodos="loadingTodos"/>
        </div>

        <button class="float bg-primary text-white btn fw-bolder" target="_blank" @click="openCreateTodoModal">
            +
        </button>
    </div>
    <ToDoForm v-if="toDoFormModalDisplayed" :isCreateTodoForm="isCreateTodoForm" :toDoItem="selectedToDoItem"
        @onCloseModal="toDoFormModalDisplayed = false" />
</template>

<style scoped>
#homeView {
    max-width: 750px !important;
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
