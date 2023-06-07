<template>
  <div class="d-flex align-items-center">
    <div class="bg-primary text-white text-center mx-auto p-5 rounded-5">
      <div class="position-relative">
        <font-awesome-icon icon="fa-solid fa-wifi" class="wifi" />
        <font-awesome-icon
          icon="fa-solid fa-circle-xmark"
          class="position-absolute top-50 start-100 translate-middle cross"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.wifi {
  font-size: 10rem;
}
.cross {
    font-size: 5rem;
}
</style>
