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
    <div class="col-8 g-0 d-flex align-items-center">
      <input
        @input="onSearch"
        v-model="searchQuery"
        type="text"
        class="d-inline-block form-control no-outline"
        placeholder="Search for a task..."
      />
    </div>
    <div class="col-4 g-0 d-flex align-items-center">
      <button type="submit" class="btn bg-primary text-white ms-2 border-0">
        Search
      </button>
    </div>
  </form>
</template>

<style scoped>
.btn {
  width: 70px;
}
</style>
