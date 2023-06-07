<script setup lang="ts">
import { ref, onMounted } from "vue";

import HomeView from "./views/home_view/HomeView.vue";
import NotificationToast from "./shared/NotificationToast.vue";
import NoInternet from "./shared/NoInternet.vue";

const isOnline = ref(navigator.onLine);

onMounted(() => {
  window.addEventListener("offline", () => {
    isOnline.value = false;
  });

  window.addEventListener("online", () => {
    isOnline.value = true;
  });
});
</script>

<template>
  <div id="app">
    <div v-if="isOnline">
      <HomeView />
      <NotificationToast />
    </div>
    <NoInternet v-else/>
  </div>
</template>

<style scoped></style>
