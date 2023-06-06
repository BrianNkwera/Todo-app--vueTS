<script setup lang="ts">
import { ref } from "vue";

//data
const searchQuery = ref("");

//emits
const emit = defineEmits(["search"]);

//methods
const onSearch = () => {
  emit("search", searchQuery.value);
};
</script>

<template>
  <form @submit.prevent class="row g-0">
    <input
      @input="onSearch"
      v-model="searchQuery"
      type="text"
      class="d-inline-block form-control no-outline"
      placeholder="Search for a task..."
    />
  </form>
</template>

<style scoped>
.btn {
  width: 70px;
}
</style>
