<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div
      id="notificationToast"
      class="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
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
        ></button>
      </div>
      <div class="toast-body bg-white">{{ notification.details }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useNotificationStore from "../stores/notificationStore";
import { storeToRefs } from "pinia";

const { notification } = storeToRefs(useNotificationStore());
</script>
