<template>
  <Logo />
  <div class="d-flex align-items-center pb-5 text-center">
    <div class="mx-auto">
      <div class="text-primary mx-auto p-5 mb-4 mt-3">
        <div class="position-relative">
          <font-awesome-icon icon="fa-solid fa-wifi" class="wifi" />
          <font-awesome-icon
            icon="fa-solid fa-circle-xmark"
            class="position-absolute translate-middle cross"
          />
        </div>
      </div>
      <h1 class="text-primary px-3 mx-2">No Internet Connection!</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "./Logo.vue";
</script>

<style scoped>
.wifi {
  font-size: 10rem;
}
.cross {
  font-size: 5rem;
  left: 80%;
  top: 90%;
}
</style>
