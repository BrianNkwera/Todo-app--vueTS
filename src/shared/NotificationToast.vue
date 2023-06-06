<template>
  <v-snackbar
    style="z-index: 5000"
    v-model="notification.show"
    color="white"
    :elevation="24"
    :light="true"
    :timeout="5000"
    :top="true"
  >
    <div class="toast-header mb-2">
      <strong class="me-auto">
        <font-awesome-icon
          v-if="!notification.isSuccess"
          icon="fa-solid fa-circle-exclamation"
          class="text-danger me-2"
        />
        <font-awesome-icon
          v-else
          icon="fa-solid fa-circle-check"
          class="text-success me-2"
        />
        {{ notification.title }}
      </strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
        @click="onCloseNotification"
      ></button>
    </div>
    <div class="toast-body bg-white">{{ notification.details }}</div>
  </v-snackbar>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import useNotificationStore from "../stores/notificationStore";

const { closeNotification } = useNotificationStore();
const { notification } = storeToRefs(useNotificationStore());

//methods
const onCloseNotification = () => {
  closeNotification();
};
</script>
