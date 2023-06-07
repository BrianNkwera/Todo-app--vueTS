<script setup lang="ts">
import HomeView from "./views/home_view/HomeView.vue";
import NotificationToast from "./shared/NotificationToast.vue";
import NoInternet from "./shared/NoInternet.vue";
</script>

<template>
  <div id="app">
    <HomeView />
    <NoInternet />
    <NotificationToast />
  </div>
</template>

<style scoped></style>
