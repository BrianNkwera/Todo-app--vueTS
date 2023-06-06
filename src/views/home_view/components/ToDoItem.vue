<script setup lang="ts">
import { TodoType } from "../../../types/todoInterface";

const props = defineProps<TodoType>();

const emit = defineEmits(["editTodo", "deleteTodo", "checkedCompleted"]);

const checkedCompleted = () => {
    emit("checkedCompleted")
}

const deleteToDo = (id: string) => {
  emit("deleteTodo", id);
};

const editToDo = () => {
  emit("editTodo");
};
</script>

<template>
  <div
    class="d-flex shadow border py-3 px-md-2 px-1  mx-1 justify-content-between align-items-center row"
  >
    <div class="d-flex align-items-center col-9 col-md-9 mb-2">
      <input type="checkbox" v-model="props.completed" @input="checkedCompleted" class="me-3 form-check-input no-outline" />
      <div class="d-inline-block">
        <p class="mb-0 text-truncate d-inlne-block title">{{ props.title }}</p>
        <small class="text-muted text-truncate d-inline-block description">{{
          props.description
        }}</small>
      </div>
    </div>
    <div class="col-3 col-md-3">
      <div class="d-flex justify-content-end">
        <button
          @click="editToDo()"
          class="btn text-primary me-3 shadow border border-primary"
        >
          View
        </button>
        <button
          @click="deleteToDo(props.id)"
          class="btn bg-secondary text-white shadow"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.description {
  max-width: 400px;
}

@media only screen and (max-width: 600px) {
  .description,
  .title {
    max-width: 300px;
  }
}

@media only screen and (max-width: 527px) {
  .description,
  .title {
    max-width: 170px;
  }
}

@media only screen and (max-width: 424px) {
  .description,
  .title {
    max-width: 100px;
  }
}
</style>
