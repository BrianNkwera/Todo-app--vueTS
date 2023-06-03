<script setup lang="ts">
import ToDoForm from './components/ToDoForm.vue';
import TabsComponent from '../../shared/TabsComponent.vue';
import TodoList from './components/TodoList.vue';

</script>

<template>
    <div id="homeView" class="container py-5 px-md-2">
        <div class="sticky-top z-200 bg-white pb-3">
            <div class="d-flex justify-content-between mb-4">
                <div>
                    <h3>To Do</h3>
                </div>
                <ToDoForm />
            </div>

            <TabsComponent :tabs="['All Tasks', 'Completed']" />
        </div>

        <div class="todos pe-md-4">
            <TodoList :key="n" v-for="n in 10" class="my-3" />
        </div>

        <button class="float bg-primary text-white btn fw-bolder" target="_blank">
            +
        </button>
    </div>
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
